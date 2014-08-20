'use strict';

var blogApp = angular.module('blogApp');

blogApp.controller('MainCtrl', function ($scope, $http, $sce, $cookies, $state, socket, Story, User) {
    $scope.stories = [];
    $scope.news = [];
    $scope.user = User.getUser();
    $scope.alertText = '';
    $scope.imagePath = '/assets/images/';
    $scope.videoPath = '/assets/videos/';

    $scope.download = function() {
        $http.get('/api/stories?token=' + $scope.token).success(function(response) {
            hideLogin();
            $scope.stories = response.stories;
            var user = {
                name: response.user,
                type: response.user
            };
            $scope.user = user;
            User.setUser(user);
            socket.syncUpdates('story', $scope.stories, function() {});
            saveToken($scope.token);
        }).error(function(data) {
            showAlert(data);
            delete $cookies.token;
            User.resetUser();
        });
    };

    $http.get('/api/news').success(function(response) {
        $scope.news = response.news;
    }).error(function(err) {
        console.error(err);
    });

    $scope.$on('$destroy', function () {
        socket.unsyncUpdates('story');
    });

    $scope.trustVideo = function(videoUrl) {
        return $scope.videoPath + videoUrl;
    };

    $scope.newStory = function() {
        Story.resetStory();
        $state.go('new');
    };

    $scope.edit = function(story) {
        Story.setStory(story);
        $state.go('edit', {
            id: story._id
        });
    };

    $scope.detail = function(story) {
        Story.setStory(story);
        User.setUser($scope.user);
        $state.go('detail', {
            id: story._id
        });
    };

    $scope.isAdmin = User.isAdmin;

    var saveToken = function(token) {
        $cookies.token = token;
    };

    var showLogin = function() {
        $('#login').show();
        $('.news-list').hide();
    };

    var hideLogin = function() {
        dismissAlert();
        $('#login').hide(400);
        $('.news-list').show();
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
