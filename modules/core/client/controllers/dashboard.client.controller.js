'use strict';

angular.module('core').controller('DashboardController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    var vm = this;
    vm.authentication = Authentication;

    vm.info = [
      { name: 'Storages', date: '16/10/2016', count: 2 },
      { name: 'Categories', date: '16/10/2016', count: 12 },
      { name: 'Records', date: '16/10/2016', count: 105 }
    ];
  }
]);
