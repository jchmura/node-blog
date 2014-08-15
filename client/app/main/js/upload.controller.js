'use strict';

var blogApp = angular.module('blogApp');

blogApp.controller('UploadCtrl', function ($scope, socket) {
    $scope.images = [];
    $scope.videos = [];
    $scope.uploading = false;

    $scope.removeImage = function(image) {
        $scope.images = _.without($scope.images, image);
    };

    $scope.removeVideo = function(image) {
        $scope.videos = _.without($scope.videos, image);
    };

    $scope.send = function() {
        $scope.uploading = true;
        if ($scope.images.length > 0) {
            startUpload($scope.images[0]);
        } else if ($scope.videos.length > 0) {
            startUpload($scope.videos[0]);
        } else {
            doneUploading();
        }
    };

    var uploadingFile;

    var startUpload = function(file) {
        uploadingFile = file;
        socket.socket.emit('start', {
            name: uploadingFile.name,
            size: uploadingFile.size,
            type: uploadingFile.type
        });
    };

    socket.socket.on('moreData', function(data) {
        var place = data.place;
        uploadingFile.progress = place;
        var blob = uploadingFile.slice(place, place + Math.min(102400, uploadingFile.size-place));
        socket.socket.emit('upload', {
            name: uploadingFile.name,
            data: blob
        });
    });

    socket.socket.on('done', function() {
        uploadingFile.progress = uploadingFile.size;
        nextFile(uploadingFile);
    });

    var nextFile = function(oldFile) {
        var index = _.indexOf($scope.images, oldFile);
        if (index !== -1) {
            if (index+1 < $scope.images.length) {
                startUpload($scope.images[index+1]);
            } else if ($scope.videos.length > 0) {
                startUpload($scope.videos[0]);
            } else {
                doneUploading();
            }
        } else {
            index = _.indexOf($scope.videos, oldFile);
            if (index+1 < $scope.videos.length) {
                startUpload($scope.videos[index+1]);
            } else {
                doneUploading();
            }
        }
    };

    var doneUploading = function() {
        $scope.uploading = false;
    };

    $('#photos:file').filestyle({input: false, buttonText: 'Dodaj zdjęcia'});
    $('#videos:file').filestyle({input: false, buttonText: 'Dodaj filmiki'});
});


blogApp.directive('fileread', [function () {
    return {
        scope: {
            fileread: '='
        },
        link: function (scope, element) {
            element.bind('change', function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = [];
                    var files = changeEvent.target.files;
                    for (var i = 0; i < files.length; i++) {
                        files[i].progress = 0;
                        scope.fileread.push(files[i]);
                    }
                });
            });
        }
    };
}]);
