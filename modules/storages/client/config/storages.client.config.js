(function () {
  'use strict';

  angular
    .module('storages')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('dashboard', {
      title: 'Storages',
      state: 'storages',
      type: 'item',
      isPublic: false,
      roles: ['user', 'admin'],
      position: 2
    });
  }
}());
