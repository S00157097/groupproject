'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    var vm = this;
    vm.authentication = Authentication;

    vm.icons = [
      { title: 'Statistics', icon: 'multiline_chart', content: 'Some random rambling content' },
      { title: 'Open Source API', icon: 'cloud_download', content: 'Some random rambling content' },
      { title: 'Flexible Storage', icon: 'storage', content: 'Some random rambling content' }
    ];
  }]);
