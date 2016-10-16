// Storages service used to communicate Storages REST endpoints
(function () {
  'use strict';

  angular
    .module('storages')
    .factory('StoragesService', StoragesService);

  StoragesService.$inject = ['$resource'];

  function StoragesService($resource) {
    return $resource('api/storages/:storageId', {
      storageId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
