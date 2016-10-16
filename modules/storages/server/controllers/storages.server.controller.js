'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Storage = mongoose.model('Storage'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Storage
 */
exports.create = function(req, res) {
  var storage = new Storage(req.body);
  storage.user = req.user;

  storage.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(storage);
    }
  });
};

/**
 * Show the current Storage
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var storage = req.storage ? req.storage.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  storage.isCurrentUserOwner = req.user && storage.user && storage.user._id.toString() === req.user._id.toString();

  res.jsonp(storage);
};

/**
 * Update a Storage
 */
exports.update = function(req, res) {
  var storage = req.storage;

  storage = _.extend(storage, req.body);

  storage.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(storage);
    }
  });
};

/**
 * Delete an Storage
 */
exports.delete = function(req, res) {
  var storage = req.storage;

  storage.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(storage);
    }
  });
};

/**
 * List of Storages
 */
exports.list = function(req, res) {
  Storage.find().sort('-created').populate('user', 'displayName').exec(function(err, storages) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(storages);
    }
  });
};

/**
 * Storage middleware
 */
exports.storageByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Storage is invalid'
    });
  }

  Storage.findById(id).populate('user', 'displayName').exec(function (err, storage) {
    if (err) {
      return next(err);
    } else if (!storage) {
      return res.status(404).send({
        message: 'No Storage with that identifier has been found'
      });
    }
    req.storage = storage;
    next();
  });
};
