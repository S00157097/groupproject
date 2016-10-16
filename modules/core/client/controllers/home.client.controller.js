'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    var vm = this;
    vm.authentication = Authentication;
  }
]);
