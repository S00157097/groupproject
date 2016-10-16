'use strict';

angular.module('statistics').controller('StatisticsController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    var vm = this;
    vm.authentication = Authentication;
  }
]);
