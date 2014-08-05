'use strict';

var blogApp = angular.module('blogApp');

blogApp.controller('DetailCtrl', function ($scope, $http, $sce, $cookies, $state, socket, $stateParams) {
    $scope.id = $stateParams.id;
    $scope.user = $stateParams.user;
    $scope.story = {};
    $scope.imagePath = '/assets/images/';
    $scope.videoPath = '/assets/videos/';
    $scope.new = {};

    $http.get('/api/stories/' + $scope.id + '?token=' + $cookies.token).success(function(response) {
        $scope.story = response;
        socket.syncUpdates('story_comments', $scope.story.comments, function() {});
    });

    $scope.trustVideo = function(videoUrl) {
        return $scope.videoPath + videoUrl;
    };

    $scope.edit = function(story) {
        $state.go('edit', {
            id: story._id,
            date: story.date,
            content: story.content,
            images: story.media.images,
            videos: story.media.videos
        });
    };

    $scope.send = function() {
        $http.post('/api/stories/' + $scope.id + '/comment', {
            comment: $scope.new
        }).success(function () {
            $scope.new = {};
        });
    };
});

blogApp.filter('todayDate', function(dateFilter) {
    return function(input) {
        if (input) {
            var now = new Date();
            var date = new Date(input);

            if (now.getDate() === date.getDate() && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
                return dateFilter(input, 'mediumTime');
            } else {
                return dateFilter(input, 'medium');
            }
        }
    };
});

blogApp.filter('images', function() {
    var imageUrl = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]\.(jpg|jpeg|png|gif|bmp)\/?)/gim;
    return function(input) {
        input = input.replace(imageUrl, '<a href="$1"><img src="$1"></a>');
        return input;
    };
});
