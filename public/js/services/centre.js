angular.module('BDR')
    .factory('centre', ['$q', 'request', 'shop', function($q, request, shop) {

        var o = {};

        function populateAdresse(centre) {
            o.getAdresse(centre.no_id).then(
                function(adresse) {
                    centre.adresse = adresse;
                }
            );
        };

        function populateHoraires(centre) {
            o.getHoraires(centre.no_id).then(
                function(res) {
                    centre.horaires = res;
                }
            );
        };

        function populateParking(centre) {
            o.getParking(centre.no_id).then(
                function(res) {
                    centre.parking = res;
                }
            );
        };

        function populatePatron(centre) {
            o.getPatron(centre.no_id).then(
                function(res) {
                    centre.patron = res;
                }
            );
        };

        function populateShops(centre) {
            o.getShops(centre.no_id).then(
                function(shops) {
                    centre.shops = shops;
                }
            );
        };

        o.id = 1;

        o.getAdresse = function(id) {
            id = id || this.id;

            var defer = $q.defer();
            request.get('/centre/' + id + '/adresse').then(
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

        o.getCentre = function(id) {
            id = id || this.id;

            var defer = $q.defer();
            request.get('/centre/' + id).then(
                function(res) {
                    populateAdresse(res);
                    populateHoraires(res);
                    populateParking(res);
                    populatePatron(res);
                    populateShops(res);

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
            id = id || this.id;

            var defer = $q.defer();
            request.get('/centre/' + id + '/horaires').then(
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

        o.getList = function() {
            var defer = $q.defer();
            request.get('/centre/list').then(
                function(res) {
                    for(var i in res) {
                        populateAdresse(res[i]);
                        populateHoraires(res[i]);
                        populateParking(res[i]);
                        populatePatron(res[i]);
                        populateShops(res[i]);
                    }

                    defer.resolve(res);
                },
                function(err) {
                    defer.reject(err);
                    throw new Error();
                }
            );

            return defer.promise;
        };

        o.getParking = function(id) {
            id = id || this.id;

            var defer = $q.defer();
            request.get('/centre/' + id + '/parking').then(
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

        o.getPatron = function(id) {
            id = id || this.id;

            var defer = $q.defer();
            request.get('/centre/' + id + '/patron').then(
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

        o.getShops = function(id) {
            id = id || this.id;

            var defer = $q.defer();
            request.get('/centre/' + id + '/shop/list').then(
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

        o.refreshParkingSpots = function(id) {
            id = id || this.id;

            var defer = $q.defer();
            request.put('/centre/' + id + '/parking/refresh').then(
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
