/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Story = require('./story.model');
var fs = require('fs');
var app = require('../../app');

exports.client = function(socket) {

};

exports.global = function(socketio) {
    Story.schema.post('save', function (doc) {
        onSave(socketio, doc);
    });
    Story.schema.post('remove', function (doc) {
        onRemove(socketio, doc);
    });
    Story.schema.pre('save', function (next) {
        preSave(socketio, this);
        next();
    })
};

var commentsLength = {};

function preSave (socketio, doc) {
    var id = doc._id;
    Story.findById(id, function (err, story) {
        if (err) { return; }
        var comments = story.comments;
        commentsLength[id] = comments? comments.length: 0;
    });
}

function onSave(socketio, doc) {
    var id = doc._id;
    var newCommentsLength = doc.comments.length;
    if (commentsLength[id] < newCommentsLength) {
        commentsLength[id] = newCommentsLength;
        var newComment = doc.comments[newCommentsLength-1];
        socketio.emit('story_comments:save', newComment);
    }

	socketio.emit('story:save', doc);
}

function onRemove(socketio, doc) {
    socketio.emit('story:remove', doc);
}