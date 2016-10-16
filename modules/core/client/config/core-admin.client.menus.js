'use strict';

angular.module('core.admin').run(['Menus',
  function (Menus) {
    Menus.addMenu('dashboard');

    Menus.addMenuItem('dashboard', {
      title: 'Home',
      state: 'home',
      type: 'item',
      roles: ['*'],
      position: 0
    });

    Menus.addMenuItem('dashboard', {
      title: 'Dashboard',
      state: 'dashboard',
      type: 'item',
      isPublic: false,      
      roles: ['user', 'admin'],
      position: 1
    });


    Menus.addMenuItem('dashboard', {
      title: 'Statistics',
      state: 'dashboard',
      type: 'item',
      isPublic: false,      
      roles: ['user', 'admin'],
      position: 3
    });

    Menus.addMenuItem('dashboard', {
      title: 'Documentation',
      state: 'home',
      type: 'item',
      roles: ['*'],
      position: 4
    });
  }
]);
