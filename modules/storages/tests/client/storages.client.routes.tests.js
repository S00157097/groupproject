(function () {
  'use strict';

  describe('Storages Route Tests', function () {
    // Initialize global variables
    var $scope,
      StoragesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _StoragesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      StoragesService = _StoragesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('storages');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/storages');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          StoragesController,
          mockStorage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('storages.view');
          $templateCache.put('modules/storages/client/views/view-storage.client.view.html', '');

          // create mock Storage
          mockStorage = new StoragesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Storage Name'
          });

          // Initialize Controller
          StoragesController = $controller('StoragesController as vm', {
            $scope: $scope,
            storageResolve: mockStorage
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:storageId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.storageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            storageId: 1
          })).toEqual('/storages/1');
        }));

        it('should attach an Storage to the controller scope', function () {
          expect($scope.vm.storage._id).toBe(mockStorage._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/storages/client/views/view-storage.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          StoragesController,
          mockStorage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('storages.create');
          $templateCache.put('modules/storages/client/views/form-storage.client.view.html', '');

          // create mock Storage
          mockStorage = new StoragesService();

          // Initialize Controller
          StoragesController = $controller('StoragesController as vm', {
            $scope: $scope,
            storageResolve: mockStorage
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.storageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/storages/create');
        }));

        it('should attach an Storage to the controller scope', function () {
          expect($scope.vm.storage._id).toBe(mockStorage._id);
          expect($scope.vm.storage._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/storages/client/views/form-storage.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          StoragesController,
          mockStorage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('storages.edit');
          $templateCache.put('modules/storages/client/views/form-storage.client.view.html', '');

          // create mock Storage
          mockStorage = new StoragesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Storage Name'
          });

          // Initialize Controller
          StoragesController = $controller('StoragesController as vm', {
            $scope: $scope,
            storageResolve: mockStorage
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:storageId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.storageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            storageId: 1
          })).toEqual('/storages/1/edit');
        }));

        it('should attach an Storage to the controller scope', function () {
          expect($scope.vm.storage._id).toBe(mockStorage._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/storages/client/views/form-storage.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
