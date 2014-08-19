/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Story = require('./story.model');
var fs = require('fs');
var app = require('../../app');
var _ = require('lodash');
var logger = require('log4js').getLogger('storySocket');

var comments = {};

Story.find({}, function(err, doc) {
    if (err) {
        logger.warn(err);
    }

    _.forEach(doc, function(story) {
        comments[story._id.toString()] = story.comments;
    })
});

exports.client = function(socket) {

};

exports.global = function(socketio) {
    Story.schema.post('save', function (doc) {
        onSave(socketio, doc);
    });
    Story.schema.post('remove', function (doc) {
        onRemove(socketio, doc);
    });
};

function onSave(socketio, doc) {
    var id = doc._id.toString();
    var newCommentsLength = doc.comments.length;
    var oldCommentsLength = comments[id]? comments[id].length: 0;

    if (oldCommentsLength < newCommentsLength) {
        var newComment = doc.comments[newCommentsLength-1];
        logger.debug('new comment\n', newComment, '\nin story', doc._id);
        socketio.emit('story_comments' + doc._id + ':save', newComment);
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
            logger.debug('removed comment\n', removedComment, '\nfrom story', doc._id);
            socketio.emit('story_comments' + doc._id + ':remove', removedComments[0]);
        }
    }

    comments[id] = doc.comments;
	socketio.emit('story:save', doc);
}

function onRemove(socketio, doc) {
    logger.debug('removed story\n', doc);
    socketio.emit('story:remove', doc);
}
