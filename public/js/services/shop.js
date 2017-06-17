angular.module('BDR')
    .factory('shop', ['$q', 'request', function($q, request) {

        var o = {};

        function populateGerant(shop) {
            o.getGerant(shop.id_enseigne).then(
                function(res) {
                    shop.gerant = res;
                }
            );
        };

        function populateHoraires(shop) {
            o.getHoraires(shop.id_enseigne).then(
                function(res) {
                    shop.horaires = res;
                }
            );
        };

        o.getGerant = function(id) {
            var defer = $q.defer();

            request.get('/shop/' + id + '/gerant').then(
                function(res) {
                    defer.resolve(res);
                },
                function(err) {
                    defer.reject(err);
                    throw new Error();
                }
            );

            return defer.promise;
        };

        o.getHoraires = function(id) {
            var defer = $q.defer();

            request.get('/shop/' + id + '/horaires').then(
                function(res) {
                    defer.resolve(res);
                },
                function(err) {
                    defer.reject(err);
                    throw new Error();
                }
            );

            return defer.promise;
        };

        o.getLogoURL = function(shop) {
            if(shop.hasOwnProperty('filename_image'))
                return 'images/' + shop.filename_image;
            else
                return '';
        };

        o.getShop = function(id) {
            var defer = $q.defer();

            request.get('/shop/' + id).then(
                function(res) {
                    populateGerant(res);
                    populateHoraires(res);
                    defer.resolve(res);
                },
                function(err) {
                    defer.reject(err);
                    throw new Error();
                }
            );

            return defer.promise;
        };

        o.getInfosPersonnel = function(id) {
            var defer = $q.defer();

            request.get('/shop/' + id + '/infos_personnel').then(
                function(res) {
                    defer.resolve(res);
                },
                function(err) {
                    defer.reject(err);
                    throw new Error();
                }
            );

            return defer.promise;
        };

        return o;

    }]);
