angular.module('BDR', ['ngDialog', 'ui.router'])

    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('main', {
                abstract: true,
                url: '/',
                templateUrl: 'partials/main.html'
            })
            .state('admin', {
                parent: 'main',
                url: 'admin',
                templateUrl: 'views/admin.html',
                controller: 'AdminCtrl'
            })
            .state('home', {
                parent: 'main',
                url: 'home',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .state('infos', {
                parent: 'main',
                url: 'infos',
                templateUrl: 'views/infos.html',
                controller: 'InfosCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('shop', {
                parent: 'main',
                url: 'shop/:id',
                templateUrl: 'views/shop.html',
                controller: 'ShopCtrl'
            });
    })

    .run(function($location, $rootScope, centre) {
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            if(centre.id === 0) {
                $location.path('/login');
            }
        });
    });
