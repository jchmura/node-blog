'use strict';

angular.module('blogApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'ui.select'
])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
        .otherwise('/');

    $locationProvider.html5Mode(true);
});
