'use strict';

var blogApp = angular.module('blogApp');

blogApp.controller('MainCtrl', function ($scope, $http, $sce, $cookies, $state, socket) {
    $scope.stories = [];
    $scope.user = '';
    $scope.alertText = '';
    $scope.imagePath = '/assets/images/';
    $scope.videoPath = '/assets/videos/';

    $scope.download = function() {
        $http.get('/api/stories?token=' + $scope.token).success(function(response) {
            hideLogin();
            $scope.stories = response.stories;
            $scope.user = response.user;
            socket.syncUpdates('story', $scope.stories, function() {
            });
            saveToken($scope.token);
        }).error(function(data) {
            showAlert(data);
            delete $cookies.token;
        });
    };

    $scope.$on('$destroy', function () {
        socket.unsyncUpdates('story');
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

    $scope.detail = function(story) {
        $state.go('detail', {
            id: story._id,
            user: $scope.user
        });
    };

    var saveToken = function(token) {
        $cookies.token = token;
    };

    var showLogin = function() {
        $('#login').show();
    };

    var hideLogin = function() {
        dismissAlert();
        $('#login').hide(400);
    };

    var showAlert = function(text) {
        $scope.alertText = text;
        $('#alert').show();
    };

    var dismissAlert = function() {
        $scope.alertText = '';
        $('#alert').hide();
    };

    if ($cookies.token) {
        $scope.token = $cookies.token;
        $scope.download();
    } else {
        showLogin();
    }
});

blogApp.filter('nlToArray', function() {
    return function (text) {
        if (text) {
            return text.split('\n');
        } else {
            return '';
        }
    };
});

blogApp.filter('media', function() {
    var mediaPath = {
        image: '/assets/images/',
        video: '/assets/videos/'
    };
    var createLink = function(url, text) {
        return '<a href="' + url + '" target="_self">' + text + '</a>';
    };
    return function(paragraph, story) {
        return paragraph.replace(/{(image|video)(\d+)}/g, function(match, type, number) {
            var url = mediaPath[type] + story.media[type + 's'][parseInt(number)-1];
            return createLink(url, type);
        });
    };
});

blogApp.filter('parseUrl', function () {
    var replacements = [
        {
            //URLs starting with http://, https://, or ftp://
            search: /^(?!(href="|src="))((https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
            replace: '<a href="$2">$2</a>'
        },
        {
            //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
            search: /^(?!(href="|src="))(^|[^\/])(www\.[\S]+(\b|$))/gim,
            replace: '$1<a href="http://$2">$2</a>'
        },
        {
            //Change email addresses to mailto:: links.
            search: /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim,
            replace: '<a href="mailto:$1">$1</a>'
        }
    ];

    return function (text) {
        for (var i = 0; replacements.length > i; i++) {
            text = text.replace(replacements[i].search, replacements[i].replace);
        }

        return text;
    };
});
