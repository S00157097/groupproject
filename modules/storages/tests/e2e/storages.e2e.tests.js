'use strict';

describe('Storages E2E Tests:', function () {
  describe('Test Storages page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/storages');
      expect(element.all(by.repeater('storage in storages')).count()).toEqual(0);
    });
  });
});
