'use strict';

/**
 * Module dependencies
 */
var storagesPolicy = require('../policies/storages.server.policy'),
  storages = require('../controllers/storages.server.controller');

module.exports = function(app) {
  // Storages Routes
  app.route('/api/storages').all(storagesPolicy.isAllowed)
    .get(storages.list)
    .post(storages.create);

  app.route('/api/storages/:storageId').all(storagesPolicy.isAllowed)
    .get(storages.read)
    .put(storages.update)
    .delete(storages.delete);

  // Finish by binding the Storage middleware
  app.param('storageId', storages.storageByID);
};
