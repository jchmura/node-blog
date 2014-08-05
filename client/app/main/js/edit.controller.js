'use strict';

var blogApp = angular.module('blogApp');

blogApp.controller('EditCtrl', function ($scope, $http, $state, $sce, $stateParams, $timeout) {
    $scope.id = $stateParams.id;
    $scope.date = $stateParams.date;
    $scope.content = $stateParams.content;
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
            _id: $scope.id,
            date: $scope.date,
            content: $scope.content,
            media: {
                images: $scope.images,
                videos: $scope.videos
            }
        };
        $http.put('/api/stories/' + $scope.id, data).success(function() {
            $state.go('main');
        }).error(function(response) {
            console.log(response);
        });
    };

    $scope.uploadFiles = function() {
        $state.go('upload', {
            id: $scope.id,
            source: 'edit',
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
    };

    $('#send').text('Edytuj wpis');
});

blogApp.config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
});
