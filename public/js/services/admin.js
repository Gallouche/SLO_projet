angular.module('BDR')
    .factory('admin', ['$q', 'centre', 'request', 'shop', function($q, centre, request, shop) {

        var o = {};

        function populateInfosPersonnel(obj) {
            shop.getInfosPersonnel(obj.id_enseigne).then(
                function(res) {
                    obj.personnel = res;
                }
            );
        };

        o.addShop = function(shop) {
            var id = centre.id;
            shop.id_centre = id;

            var defer = $q.defer();

            request.post('/admin/' + id + '/addShop', shop).then(
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

        o.deleteShop = function(shop) {
            var id = shop.id_enseigne;

            var defer = $q.defer();

            request.delete('/admin/deleteShop/' + id).then(
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

        o.getFreeLocals = function(id) {
            id = id || centre.id;

            var defer = $q.defer();

            request.get('/admin/' + id + '/view/locaux_libres').then(
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

        o.getInfosEnseignes = function(id) {
            id = id || centre.id;

            var defer = $q.defer();
            request.get('/admin/' + id + '/view/infos_enseigne_gerant').then(
                function(res) {
                    for(var i in res)
                        populateInfosPersonnel(res[i]);

                    defer.resolve(res);
                },
                function(err) {
                    defer.reject(err);
                    throw new Error();
                }
            );

            return defer.promise;
        };

        o.setCostForLocal = function(id_local, cost) {
            var defer  = $q.defer();

            request.put('/admin/' + centre.id + '/local/' + id_local + '/cost/' + cost).then(
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
