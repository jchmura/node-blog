'use strict';

var blogApp = angular.module('blogApp');

blogApp.controller('DetailNewsCtrl', function ($scope, $http, $state, socket, $stateParams) {
    var slug = $stateParams.slug;
    $scope.news = {};
    $http.get('/api/news/' + slug).success(function(response) {
        $scope.news = response;
        socket.syncUpdates('news_comments' + response._id, $scope.news.comments, function() {});
    }).error(function(err) {
        console.error(err);
    });
    $scope.new = {};

    $scope.send = function() {
        $http.post('/api/news/' + $scope.news._id + '/comment', {
            comment: $scope.new
        }).success(function () {
            $scope.new = {};
        });
    };
});
