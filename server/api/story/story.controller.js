/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /stories              ->  index
 * GET     /stories/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var Story = require('./story.model');

// Get list of stories
exports.index = function(req, res) {
    var token = req.query.token;
    var user;
    if (token === process.env.NORMAL_PWD) {
        user = 'normal';
    } else if (token === process.env.ADMIN_PWD) {
        user = 'admin';
    } else {
        return res.send(403, 'Złe hasło debilu!');
    }
    Story.find({}).sort('-date').exec(function (err, stories) {
        if(err) {
            return handleError(res, err);
        }

        var response = {
            stories: stories,
            user: user
        };

        return res.json(200, response);
    });
};

// Get a single story
exports.show = function(req, res) {
    var token = req.query.token;
    if (token === process.env.NORMAL_PWD || token === process.env.ADMIN_PWD) {
        Story.findById(req.params.id, function (err, story) {
            if(err) { return handleError(res, err); }
            if(!story) { return res.send(404); }
            return res.json(story);
        });
    } else {
        res.send(403);
    }
};

// Creates a new story in the DB.
exports.create = function(req, res) {
    Story.create(req.body, function(err, story) {
        if(err) { return handleError(res, err); }
        return res.json(201, story);
    });
};

// Updates an existing story in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    Story.findById(req.params.id, function (err, story) {
        if (err) { return handleError(res, err); }
        if(!story) { return res.send(404); }
        var updated = _.merge(story, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, story);
        });
    });
};

// Deletes a story from the DB.
/*exports.destroy = function(req, res) {
    Story.findById(req.params.id, function (err, story) {
        if(err) { return handleError(res, err); }
        if(!story) { return res.send(404); }
        story.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.send(204);
        });
    });
};*/

exports.comment = function(req, res) {
    Story.findById(req.params.id, function(err, story) {
        if (err) { return handleError(res, err); }
        if (!story) { return res.send(404); }

        var comment = req.body.comment;
        comment.date = new Date();
        story.comments.push(comment);
        story.save(function(err, story) {
            if (err) { return handleError(res, err); }
            return res.json(200, story);
        });
    })
};

function handleError(res, err) {
    console.log(err);
    return res.send(500, err);
}