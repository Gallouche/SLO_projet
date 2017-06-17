angular.module('BDR')
    .controller('AdminCtrl', ['$scope', 'admin', 'centre', 'ngDialog', 'shop', function($scope, admin, centre, ngDialog, shop) {

        $scope.infos_enseignes = [];
        $scope.locaux_libres = [];
        $scope.newShop = {};
        $scope.shop = {};

        admin.getInfosEnseignes().then(
            function(infos) {
                $scope.infos_enseignes = infos;
            }
        );

        $scope.addShop = function() {
            admin.addShop($scope.newShop).then(
                function(res) {
                    admin.getInfosEnseignes().then(
                        function(infos) {
                            $scope.infos_enseignes = infos;
                        }
                    );
                }
            );

            return true;
        };

        $scope.addShopAlert = function() {
            admin.getFreeLocals().then(
                function(locals) {
                    $scope.locaux_libres = locals;
                    ngDialog.open({
                        template: 'partials/create-shop-alert.html',
                        className: 'ngdialog-theme-default',
                        scope: $scope
                    });
                }
            );
        };

        $scope.changeCost = function(cost) {
            cost = parseInt(cost);

            if(isNaN(cost))
                return true;

            var id_local = $scope.shop.emplacement_local;

            admin.setCostForLocal(id_local, cost).then(
                function(res) {
                    $scope.shop.cout = res;
                }
            );

            return true;
        };

        $scope.costAlert = function(shop) {
            $scope.shop = shop;
            ngDialog.open({
                template: 'partials/change-cost-alert.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        };

        $scope.deleteShop = function(index) {
            var shop = $scope.infos_enseignes[index];

            admin.deleteShop(shop).then(
                function(res) {
                    $scope.infos_enseignes.splice(index, 1);
                }
            );
        };

    }]);
