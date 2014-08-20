/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var News = require('./news.model');
var fs = require('fs');
var app = require('../../app');
var _ = require('lodash');
var logger = require('log4js').getLogger('newsSocket');

var comments = {};

News.find({}, function(err, docs) {
    if (err) {
        logger.warn(err);
    }

    _.forEach(docs, function(doc) {
        comments[doc._id.toString()] = doc.comments;
    })
});

exports.client = function(socket) {

};

exports.global = function(socketio) {
    News.schema.post('save', function (doc) {
        onSave(socketio, doc);
    });
    News.schema.post('remove', function (doc) {
        onRemove(socketio, doc);
    });
};

function onSave(socketio, doc) {
    var id = doc._id.toString();
    var newCommentsLength = doc.comments.length;
    var oldCommentsLength = comments[id]? comments[id].length: 0;

    if (oldCommentsLength < newCommentsLength) {
        var newComment = doc.comments[newCommentsLength-1];
        logger.debug('new comment\n', newComment, '\nin news', doc._id);
        socketio.emit('news_comments' + doc._id + ':save', newComment);
    } else if (oldCommentsLength > newCommentsLength) {
        var removedIds = _.map(doc.comments, function(comment) {
            return comment._id.toString();
        });
        var removedComments = _.reject(comments[id], function(comment) {
            return _.contains(removedIds, comment._id.toString());
        });

        if (removedComments.length > 1) {
            logger.error('Two comments deleted at once.\n', removedComments)
        } else {
            var removedComment = removedComments[0];
            logger.debug('removed comment\n', removedComment, '\nfrom news', doc._id);
            socketio.emit('news_comments' + doc._id + ':remove', removedComments[0]);
        }
    }

    comments[id] = doc.comments;
	socketio.emit('news:save', doc);
}

function onRemove(socketio, doc) {
    logger.debug('removed news\n', doc);
    socketio.emit('news:remove', doc);
}
