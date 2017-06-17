angular.module('BDR')
    .factory('auth', ['$http', '$window', function($http, $window) {

        var auth = {};

        auth.saveToken = function(token) {
            $window.localStorage['slo-web-token'] = token;
        };

        auth.getToken = function() {
            return $window.localStorage['slo-web-token'];
        };

        auth.isLoggedIn = function() {
            var token = auth.getToken();

            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        auth.currentUser = function() {
            if (auth.isLoggedIn()) {
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload;
            }
        };

        auth.register = function(user) {
            return $http.post('/api/auth/register', user)
                .success(function(data) {
                    auth.saveToken(data);
                });
        };

        auth.logIn = function(user) {
            return $http.post('/api/auth/login', user)
                .success(function(data) {
                    auth.saveToken(data);
                });
        };

        auth.logOut = function() {
            $window.localStorage.removeItem('slo-web-token');
        };

        return auth;

    }]);
