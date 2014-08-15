'use strict';

var blogApp = angular.module('blogApp');

blogApp.controller('NewCtrl', function ($scope, $http, $state, $sce, $timeout, Story) {
    $scope.story = {};
    Story.getStory().then(function(story) {
        $scope.story = story;
    }, function(err) {
        console.error(err);
    });

    $scope.story.date = $scope.story.date || new Date();
    $scope.media = {};
    var initialized = false;

    $timeout(function() {
        initialized = true;
    }, 500);

    $scope.$watch(function() {
        if (!$scope.story.content) {
            return 0;
        }
        var matches = $scope.story.content.match(/{image\d+}/g) || [];
        return matches.length;
    }, function(newValue, oldValue) {
        if (newValue < oldValue) {
            $scope.story.media.images.pop();
        } else if (newValue > 0 && initialized) {
            $scope.story.media.images.push('image' + newValue);
        }
    });

    $scope.$watch(function() {
        if (!$scope.story.content) {
            return 0;
        }
        var matches = $scope.story.content.match(/{video\d+}/g) || [];
        return matches.length;
    }, function(newValue, oldValue) {
        if (newValue < oldValue) {
            $scope.story.media.videos.pop();
        } else if (newValue > 0 && initialized) {
            $scope.story.media.videos.push('video' + newValue);
        }
    });

    $http.get('/api/media').success(function(response) {
        $scope.media = response;
    });

    $scope.today = function() {
        $scope.story.date = new Date();
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        showWeeks: 'false',
        startingDay: 1
    };

    $scope.send = function() {
        delete $scope.story._id;
        $http.post('/api/stories', $scope.story).success(function() {
            Story.resetStory();
            $state.go('main');
        });
    };

    $scope.uploadFiles = function() {
        Story.setStory($scope.story);
        $state.go('upload');
    };

    $scope.trustAsHtml = function(value) {
        if (value) {
            return $sce.trustAsHtml(value.toString());
        } else {
            return '';
        }
    };
});

blogApp.config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
});
