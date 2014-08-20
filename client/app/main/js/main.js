'use strict';

var blogApp = angular.module('blogApp');

blogApp.config(function ($stateProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
        }).
        state('new', {
            url: '/new',
            templateUrl: 'app/main/new.html',
            controller: 'NewCtrl'
        }).
        state('upload', {
            url: '/upload',
            templateUrl: 'app/main/upload.html',
            controller: 'UploadCtrl'
        }).
        state('edit', {
            url: '/edit/:id',
            templateUrl: 'app/main/new.html',
            controller: 'EditCtrl'
        }).
        state('detail', {
            url: '/:id',
            templateUrl: 'app/main/detail.html',
            controller: 'DetailCtrl'
        }).
        state('detail-news', {
            url: '/news/:slug',
            templateUrl: 'app/main/news.html',
            controller: 'DetailNewsCtrl'
        });
});

blogApp.run(function(PreviousState) {
    PreviousState.init();
});
