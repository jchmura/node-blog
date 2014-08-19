'use strict';

var blogApp = angular.module('blogApp');

blogApp.factory('Story', function($cookies, $http, $q) {
    var emptyStory = function() {
        return {
            _id: '',
            date: new Date(),
            content: '',
            media: {
                images: [],
                videos: []
            },
            comments: []
        };
    };

    var story = emptyStory();

    return {
        getStory: function(id) {
            var deferred = $q.defer();
            if (!id || id === story._id) {
                deferred.resolve(story);
            } else {
                $http.get('/api/stories/' + id + '?token=' + $cookies.token).success(function(response) {
                    story = response;
                    deferred.resolve(story);
                }).error(function(err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        },
        setStory: function(newStory) {
            story = newStory;
        },
        resetStory: function() {
            story = emptyStory();
        }
    };
});

// TODO authenticate user
blogApp.factory('User', function() {
    var emptyUser = function() {
        return {
            name: '',
            type: null
        };
    };

    var user = emptyUser();

    return {
        getUser: function() {
            return user;
        },
        setUser: function(newStory) {
            user = newStory;
        },
        resetUser: function() {
            user = emptyUser();
        },
        isAdmin: function() {
            return user? user.type === 'admin': false;
        }
    };
});

blogApp.factory('PreviousState', function($rootScope) {
    var previousState;
    var previousParams;
    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        previousState = from;
        previousParams = fromParams;
    });

    return {
        get: function() {
            return previousState;
        },
        params: function() {
            return previousParams;
        },
        init: function() {
            previousState = 'main';
            previousParams = {};
        }
    };
});
