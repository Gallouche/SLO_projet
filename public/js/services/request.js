angular.module('BDR')
    .factory('request', ['$http', '$q', function($http, $q) {

        const API = '/api';

        return {
            delete: function(url) {
                var defer = $q.defer();

                $http.delete(API + url).then(
                    function(res) {
                        defer.resolve(res.data);
                    },
                    function(err) {
                        defer.reject(err);
                    }
                );

                return defer.promise;
            },

            get: function(url) {
                var defer = $q.defer();

                $http.get(API + url).then(
                    function(res) {
                        defer.resolve(res.data);
                    },
                    function(err) {
                        defer.reject(err);
                    }
                );

                return defer.promise;
            },

            post: function(url, obj) {
                var defer = $q.defer();

                $http.post(API + url, obj).then(
                    function(res) {
                        defer.resolve(res.data);
                    },
                    function(err) {
                        defer.reject(err);
                    }
                );

                return defer.promise;
            },

            put: function(url, obj) {
                var defer = $q.defer();

                $http.put(API + url, obj).then(
                    function(res) {
                        defer.resolve(res.data);
                    },
                    function(err) {
                        defer.reject(err);
                    }
                );

                return defer.promise;
            }
        };

    }]);
