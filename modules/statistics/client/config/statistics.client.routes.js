(function () {
  'use strict';

  angular.module('statistics').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      // Redirect to 404 when route not found
      $urlRouterProvider.otherwise('not-found');

      // Home state routing
      $stateProvider
        .state('statistics', {
          url: '/statistics',
          templateUrl: 'modules/statistics/views/statistics.client.view.html',
          controller: 'StatisticsController',
          controllerAs: 'vm'
        });
    }
  ]);
} ());
