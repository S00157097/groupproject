'use strict';

// Configuring the Articles module
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users'
    });

    Menus.addMenu('account');

    Menus.addMenuItem('account', {
      title: 'Edit Profile',
      state: 'settings.profile',
      isPublic: false,
      roles: ['user', 'admin']
    });

    Menus.addMenuItem('account', {
      title: 'Change Profile Picture',
      state: 'settings.picture',
      isPublic: false,
      roles: ['user', 'admin']
    });

    Menus.addMenuItem('account', {
      title: 'Change Password',
      state: 'settings.password',
      isPublic: false,
      roles: ['user', 'admin']
    });

    Menus.addMenuItem('account', {
      title: 'Social Accounts',
      state: 'settings.accounts',
      isPublic: false,
      roles: ['user', 'admin']
    });
  }
]);
