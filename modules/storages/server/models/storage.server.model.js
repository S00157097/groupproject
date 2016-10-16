'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Storage Schema
 */
var StorageSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Storage name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Storage', StorageSchema);
