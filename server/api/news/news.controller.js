/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /stories              ->  index
 * GET     /stories/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var News = require('./news.model');
var logger = require('log4js').getLogger('newsController');

// Get list of stories
exports.index = function(req, res) {
    News.find({}).sort('-date').exec(function (err, docs) {
        if(err) {
            return handleError(res, err);
        }

        var response = {
            news: docs
        };

        return res.json(200, response);
    });
};

// Get a single story
exports.show = function(req, res) {
    News.findOne({slug: req.params.slug}, function (err, doc) {
        if(err) { return handleError(res, err); }
        if(!doc) { return res.send(404); }
        return res.json(doc);
    });
};

// Creates a new story in the DB.
exports.create = function(req, res) {
    News.create(req.body, function(err, doc) {
        if(err) { return handleError(res, err); }
        return res.json(201, doc);
    });
};

// Updates an existing story in the DB.
exports.update = function(req, res) {
    stripBody(req.body);
    News.findById(req.params.id, function (err, doc) {
        if (err) { return handleError(res, err); }
        if(!doc) { return res.send(404); }
        var updated = _.merge(doc, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, doc);
        });
    });
};

// Deletes a story from the DB.
exports.destroy = function(req, res) {
    News.findById(req.params.id, function (err, doc) {
        if(err) { return handleError(res, err); }
        if(!doc) { return res.send(404); }
        doc.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.send(204);
        });
    });
};

exports.comment = function(req, res) {
    News.findById(req.params.id, function(err, doc) {
        if (err) { return handleError(res, err); }
        if (!doc) { return res.send(404); }

        var comment = req.body.comment;
        comment.date = new Date();
        doc.comments.push(comment);
        doc.save(function(err, story) {
            if (err) { return handleError(res, err); }
            return res.json(200, story);
        });
    })
};

exports.destroyComment = function(req, res) {
    News.findById(req.params.id, function(err, doc) {
        if (err) { return handleError(res, err); }
        if (!doc) { return res.send(404); }

        doc.comments.pull(req.params.comment);

        doc.save(function(err, story) {
            if (err) { return handleError(res, err); }
            return res.send(204);
        });
    })
};

function handleError(res, err) {
    logger.warn(err);
    return res.send(500, err);
}

function stripBody(body) {
    var toStrip = ['_id', 'comments'];
    _.forEach(toStrip, function(property) {
        if (body[property]) {
            delete body[property];
        }
    });
}
