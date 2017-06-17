angular.module('BDR')
    .controller('NavCtrl', ['$scope', '$state', 'centre', function($scope, $state, centre) {

        $scope.logOut = function() {
            centre.id = 0;
            $state.go('login');
        };

    }]);
