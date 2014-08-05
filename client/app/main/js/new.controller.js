'use strict';

var blogApp = angular.module('blogApp');

blogApp.controller('NewCtrl', function ($scope, $http, $state, $stateParams, $sce, $timeout) {
    $scope.date = $stateParams.date || new Date();
    $scope.content = $stateParams.content || '';
    $scope.media = {};
    var initialized = false;
    $timeout(function() {
        initialized = true;
    }, 500);

    if (!$stateParams.images) {
        $scope.images = [];
    } else {
        $scope.images = $stateParams.images.split(',');
    }

    if (!$stateParams.videos) {
        $scope.videos = [];
    } else {
        $scope.videos = $stateParams.videos.split(',');
    }

    $scope.$watch(function() {
        var matches = $scope.content.match(/{image\d+}/g) || [];
        return matches.length;
    }, function(newValue, oldValue) {
        if (newValue < oldValue) {
            $scope.images.pop();
        } else if (newValue > 0 && initialized) {
            $scope.images.push('image' + newValue);
        }
    });

    $scope.$watch(function() {
        var matches = $scope.content.match(/{video\d+}/g) || [];
        return matches.length;
    }, function(newValue, oldValue) {
        if (newValue < oldValue) {
            $scope.videos.pop();
        } else if (newValue > 0 && initialized) {
            $scope.videos.push('video' + newValue);
        }
    });

    $http.get('/api/media').success(function(response) {
        $scope.media = response;
    });

    $scope.today = function() {
        $scope.date = new Date();
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
        var data = {
            date: $scope.date,
            content: $scope.content,
            media: {
                images: $scope.images,
                videos: $scope.videos
            }
        };
        $http.post('/api/stories', data).success(function(response) {
            $state.go('main');
        });
    };
    
    $scope.uploadFiles = function() {
        $state.go('upload', {
            source: 'new',
            date: $scope.date,
            content: $scope.content,
            images: $scope.images,
            videos: $scope.videos
        });
    };

    $scope.trustAsHtml = function(value) {
        if (value) {
            return $sce.trustAsHtml(value.toString());
        } else {
            return '';
        }
    }
});

blogApp.config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
});