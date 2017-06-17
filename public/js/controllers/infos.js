angular.module('BDR')
    .controller('InfosCtrl', ['$interval', '$scope', 'centre', function($interval, $scope, centre) {

        $scope.centre = {};

        centre.getCentre().then(
            function(res) {
                $scope.centre = res;
            }
        );

        $interval(function() {
            centre.refreshParkingSpots().then(
                function(res) {
                    $scope.centre.parking.nb_places_occupees = res;
                }
            );
        }, 5000);

    }]);
