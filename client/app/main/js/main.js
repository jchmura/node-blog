'use strict';

angular.module('blogApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            }).
            state('new', {
                templateUrl: 'app/main/new.html',
                controller: 'NewCtrl',
                params: ['date', 'content', 'images', 'videos']
            }).
            state('upload', {
                templateUrl: 'app/main/upload.html',
                controller: 'UploadCtrl',
                params: ['source', 'id', 'date', 'content', 'images', 'videos']
            }).
            state('edit', {
                templateUrl: 'app/main/new.html',
                controller: 'EditCtrl',
                params: ['id', 'date', 'content', 'images', 'videos']
            }).
            state('detail', {
                templateUrl: 'app/main/detail.html',
                controller: 'DetailCtrl',
                params: ['id', 'user']
            });
    });
