'use strict';

var blogApp = angular.module('blogApp');

blogApp.controller('DetailCtrl', function ($scope, $http, $sce, $cookies, $state, socket, $stateParams, Story, User) {
    var id = $stateParams.id;
    $scope.story = {};
    Story.getStory(id).then(function(story) {
        $scope.story = story;
        socket.syncUpdates('story_comments' + id, $scope.story.comments, function() {});
    }, function(err) {
        console.error(err);
    });
    $scope.isAdmin = User.isAdmin;
    $scope.imagePath = '/assets/images/';
    $scope.videoPath = '/assets/videos/';
    $scope.new = {};

    $scope.trustVideo = function(videoUrl) {
        return $scope.videoPath + videoUrl;
    };

    $scope.edit = function(story) {
        Story.setStory(story);
        $state.go('edit', {id: id});
    };

    $scope.send = function() {
        $http.post('/api/stories/' + id + '/comment', {
            comment: $scope.new
        }).success(function () {
            $scope.new = {};
        });
    };
});
