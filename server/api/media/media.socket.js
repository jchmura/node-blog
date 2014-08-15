/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var fs = require('fs');
var app = require('../../app');

exports.client = function(socket) {
    socket.on('start', function(data) {
        onStart(socket, data);
    });

    socket.on('upload', function(data) {
        onUpload(socket, data);
    });
};

exports.global = function(socket) {

};

var files = [];

function onStart(socket, data) {
    var name = data.name;
    console.log('Starting uploading file: ' + name);
    files[name] = {
        data: [],
        size: data.size,
        downloaded: 0
    };
    fs.open(getType(data.type) + name, 'a', function (err, fd) {
        if (err) {
            console.log(err);
        } else {
            files[name].handler = fd;
            socket.emit('moreData', {
                place: 0
            });
        }
    });
}

function onUpload(socket, data) {
    var name = data.name;
    var file = files[name];
    file.data.push(data.data);
    file.downloaded += data.data.length;
    if (file.downloaded == file.size) {
        var buff = Buffer.concat(file.data);
        fs.write(file.handler, buff, 0, buff.length, null, function(err) {
            if (err) {
                console.log(err);
            } else {
                socket.emit('done');
                fs.close(file.handler);
                delete files[name];
            }
        });
    } else {
        var place = file.downloaded;
        socket.emit('moreData', {
            place: place
        });
    }
}

function getType(type) {
    var found = type.replace(/.*(image|video).*/, '$1');
    if (found) {
        console.log(found);
        return app.get('appPath') + '/assets/' + found + 's/';
    }
}
