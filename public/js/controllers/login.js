angular.module('BDR')
    .controller('LoginCtrl', ['$filter', '$scope', '$state', 'centre', function($filter, $scope, $state, centre) {

        $scope.alertStyle = {visibility: 'hidden'};
        $scope.centres = [];
        $scope.id = 0;

        centre.getList().then(
            function(results) {
                $scope.centres = results;
            });

        $scope.login = function() {
            if($scope.id === 0) {
                $scope.alertStyle = {visibility: 'visible'};

                return;
            }

            centre.id = $scope.id;
            $state.go('home');
        };

    }]);
