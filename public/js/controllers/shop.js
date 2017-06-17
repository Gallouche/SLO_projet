angular.module('BDR')
    .controller('ShopCtrl', ['$scope', '$stateParams', 'shop', function($scope, $stateParams, shop) {

        $scope.shop = {};

        $scope.getLogoURL = shop.getLogoURL;

        shop.getShop($stateParams.id).then(
            function(shop) {
                $scope.shop = shop;
            }
        );

    }]);
