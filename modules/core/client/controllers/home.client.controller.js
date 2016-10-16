'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
  }
]);
