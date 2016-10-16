(function () {
  'use strict';

  angular.module('storages').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      // Redirect to 404 when route not found
      $urlRouterProvider.otherwise('not-found');

      // Home state routing
      $stateProvider
        .state('storages', {
          url: '/storage',
          templateUrl: 'modules/storages/views/storages.client.view.html',
          controller: 'StorageController',
          controllerAs: 'vm'
        })
    }
  ]);
} ());
