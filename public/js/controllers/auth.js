'use strict';

angular.module('BDR')

    .controller('AuthCtrl',
        function($location, $sce, $scope, $timeout, auth) {

            $scope.user = {};

            $scope.register = function() {
                auth.register($scope.user).then(
                    function(success) {
                        $scope.user = {};
                        $scope.success = $sce.trustAsHtml(success.message);
                        $timeout(function() {
                            $scope.closeThisDialog();
                        }, 1000);
                    },
                    function(error) {
                        $scope.error = $sce.trustAsHtml(error.data.message);
                    }
                );
            };

            $scope.logIn = function() {
                auth.logIn($scope.user).then(
                    function(success) {
                        $scope.user = {};
                        $scope.success = $sce.trustAsHtml(success.message);
                        $timeout(function() {
                            $scope.closeThisDialog();
                        }, 1000);
                    },
                    function(error) {
                        $scope.error = $sce.trustAsHtml(error.data.message);
                    }
                );
            };

        });
