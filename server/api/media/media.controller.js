'use strict';

var _ = require('lodash');
var fs = require('fs');
var app = require('../../app');
var logger = require('log4js').getLogger('mediaController');

var MEDIA_DIR = app.get('appPath') + '/assets/';

exports.index = function(req, res) {
    var media = {};
    fs.readdir(MEDIA_DIR + 'images', function(err, files) {
        if (err) return handleError(res, err);
        media.images = files;
        fs.readdir(MEDIA_DIR + 'videos', function(err, files) {
            if (err) return handleError(res, err);
            media.videos = files;
            return res.json(media);
        })
    })
};

exports.show = function(req, res) {
    var type = req.params.type;
    fs.readdir(MEDIA_DIR + type, function(err, files) {
        if (err) {
            return handleError(res, err);
        } else {
            return res.json(files);
        }
    });
};


function handleError(res, err) {
    logger.warn(err);
    return res.send(500, err);
}
