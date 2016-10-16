'use strict';

angular.module('storages').controller('StorageController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    var vm = this;
    vm.authentication = Authentication;

    vm.info = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  }
]);
