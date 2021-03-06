'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
  function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise('not-found');

    // Home state routing
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/core/views/home.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })

      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'modules/core/views/dashboard.client.view.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })

      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/views/404.client.view.html'
      });

    $mdThemingProvider.theme('default')
      .primaryPalette('teal');
  }
]);
