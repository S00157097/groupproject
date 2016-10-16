(function () {
  'use strict';

  angular
    .module('statistics')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('dashboard', {
      title: 'Statistics',
      state: 'statistics',
      type: 'item',
      isPublic: false,
      roles: ['user', 'admin'],
      position: 3
    });
  }
}());
