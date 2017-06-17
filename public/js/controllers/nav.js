angular.module('BDR')
    .controller('NavCtrl', ['$scope', '$state', 'auth', 'centre', 'ngDialog', function($scope, $state, auth, centre, ngDialog) {

        $scope.currentUser = auth.currentUser;
        $scope.isLoggedIn = auth.isLoggedIn;

        $scope.showLogIn = function() {
            ngDialog.open({
                template: 'partials/login.html',
                controller: 'AuthCtrl'
            });
        };

        $scope.disconnect = function() {
            auth.logOut();
        };

        $scope.logOut = function() {
            $scope.disconnect();
            centre.id = 0;
            $state.go('login');
        };

    }]);
