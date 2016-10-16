'use strict';

angular.module('core').controller('HeaderController', ['$mdSidenav', '$scope', '$state', 'Authentication', 'Menus',
  function ($mdSidenav, $scope, $state, Authentication, Menus) {
    // Expose view variables
    var vm = this;
    vm.$state = $state;
    vm.authentication = Authentication;

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    };

    // Get the topbar menu
    vm.menu = Menus.getMenu('dashboard');

    vm.toggleLeft = buildToggler('left');

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      vm.toggleLeft = buildToggler('left');
    });

    
  }
]);
