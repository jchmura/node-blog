'use strict';

var blogApp = angular.module('blogApp');

blogApp.controller('EditCtrl', function ($scope, $http, $state, $sce, $stateParams, $timeout, Story, PreviousState) {
    var id = $stateParams.id;
    $scope.story = {};
    Story.getStory(id).then(function(story) {
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
        $http.put('/api/stories/' + id, $scope.story).success(function() {
            Story.setStory($scope.story);
            var previousState = PreviousState.get();
            if (previousState.name === 'detail') {
                $state.go('detail', PreviousState.params());
            } else {
                $state.go('main');
            }
        }).error(function(response) {
            console.log(response);
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

    $('#send').text('Edytuj wpis');
});

blogApp.config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
});
