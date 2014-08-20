'use strict';

var blogApp = angular.module('blogApp');

blogApp.directive('storyAdmin', function(Story, User, $http, $state, $modal) {
    return {
        restrict: 'E',
        scope: {
            story: '='
        },
        templateUrl: 'app/main/templates/story-admin.html',
        controller: function($scope) {
            $scope.isAdmin = User.isAdmin;
            $scope.edit = function() {
                var story = $scope.story;
                Story.setStory(story);
                $state.go('edit', {
                    id: story._id
                });
            };
            $scope.destroy = function() {
                var story = $scope.story;
                var modal = $modal.open({
                    templateUrl: '/app/main/templates/delete-story-modal.html',
                    controller: function($scope, $modalInstance, story) {
                        $scope.story = story;
                        $scope.ok = function () {
                            $modalInstance.close();
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                    },
                    resolve: {
                        story: function() {
                            return story;
                        }
                    }
                });

                modal.result.then(function() {
                    $http.delete('/api/stories/' + story._id).error(function(err) {
                        console.error(err);
                    }).success(function() {
                        if ($state.current.name === 'detail') {
                            $state.go('main');
                        }
                    });
                });
            };
        }
    };
});
