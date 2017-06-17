angular.module('BDR')
    .controller('HomeCtrl', ['$scope', 'centre', 'shop', function($scope, centre, shop) {

        $scope.centre = {};

        $scope.getLogoURL = shop.getLogoURL;

        centre.getCentre().then(
            function(res) {
                $scope.centre = res;
            }
        );

    }]);
