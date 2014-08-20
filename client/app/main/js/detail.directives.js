'use strict';

var blogApp = angular.module('blogApp');

blogApp.directive('commentAdmin', function(Story, User, $http, $state, $modal) {
    return {
        restrict: 'E',
        scope: {
            story: '=',
            comment: '='
        },
        templateUrl: 'app/main/templates/comment-admin.html',
        controller: function($scope) {
            $scope.isAdmin = User.isAdmin;
            $scope.destroy = function() {
                var story = $scope.story;
                var comment = $scope.comment;
                var modal = $modal.open({
                    templateUrl: 'app/main/templates/delete-comment-modal.html',
                    controller: function($scope, $modalInstance, comment) {
                        $scope.comment = comment;
                        $scope.ok = function () {
                            $modalInstance.close();
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                    },
                    resolve: {
                        comment: function() {
                            return comment;
                        }
                    }
                });

                modal.result.then(function() {
                    $http.delete('/api/stories/' + story._id + '/comment/' + comment._id).error(function(err) {
                        console.error(err);
                    });
                });
            };
        }
    };
});
