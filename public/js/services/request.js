angular.module('BDR')
    .factory('request', ['$http', '$q', 'auth', function($http, $q, auth) {

        const API = '/api';

        const headers = {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        };

        return {
            delete: function(url) {
                var defer = $q.defer();

                $http.delete(API + url, headers).then(
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

                $http.get(API + url, headers).then(
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

                $http.post(API + url, obj, headers).then(
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

                $http.put(API + url, obj, headers).then(
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
