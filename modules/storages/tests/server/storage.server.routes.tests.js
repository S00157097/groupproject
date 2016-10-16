'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Storage = mongoose.model('Storage'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  storage;

/**
 * Storage routes tests
 */
describe('Storage CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Storage
    user.save(function () {
      storage = {
        name: 'Storage name'
      };

      done();
    });
  });

  it('should be able to save a Storage if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Storage
        agent.post('/api/storages')
          .send(storage)
          .expect(200)
          .end(function (storageSaveErr, storageSaveRes) {
            // Handle Storage save error
            if (storageSaveErr) {
              return done(storageSaveErr);
            }

            // Get a list of Storages
            agent.get('/api/storages')
              .end(function (storagesGetErr, storagesGetRes) {
                // Handle Storages save error
                if (storagesGetErr) {
                  return done(storagesGetErr);
                }

                // Get Storages list
                var storages = storagesGetRes.body;

                // Set assertions
                (storages[0].user._id).should.equal(userId);
                (storages[0].name).should.match('Storage name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Storage if not logged in', function (done) {
    agent.post('/api/storages')
      .send(storage)
      .expect(403)
      .end(function (storageSaveErr, storageSaveRes) {
        // Call the assertion callback
        done(storageSaveErr);
      });
  });

  it('should not be able to save an Storage if no name is provided', function (done) {
    // Invalidate name field
    storage.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Storage
        agent.post('/api/storages')
          .send(storage)
          .expect(400)
          .end(function (storageSaveErr, storageSaveRes) {
            // Set message assertion
            (storageSaveRes.body.message).should.match('Please fill Storage name');

            // Handle Storage save error
            done(storageSaveErr);
          });
      });
  });

  it('should be able to update an Storage if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Storage
        agent.post('/api/storages')
          .send(storage)
          .expect(200)
          .end(function (storageSaveErr, storageSaveRes) {
            // Handle Storage save error
            if (storageSaveErr) {
              return done(storageSaveErr);
            }

            // Update Storage name
            storage.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Storage
            agent.put('/api/storages/' + storageSaveRes.body._id)
              .send(storage)
              .expect(200)
              .end(function (storageUpdateErr, storageUpdateRes) {
                // Handle Storage update error
                if (storageUpdateErr) {
                  return done(storageUpdateErr);
                }

                // Set assertions
                (storageUpdateRes.body._id).should.equal(storageSaveRes.body._id);
                (storageUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Storages if not signed in', function (done) {
    // Create new Storage model instance
    var storageObj = new Storage(storage);

    // Save the storage
    storageObj.save(function () {
      // Request Storages
      request(app).get('/api/storages')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Storage if not signed in', function (done) {
    // Create new Storage model instance
    var storageObj = new Storage(storage);

    // Save the Storage
    storageObj.save(function () {
      request(app).get('/api/storages/' + storageObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', storage.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Storage with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/storages/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Storage is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Storage which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Storage
    request(app).get('/api/storages/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Storage with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Storage if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Storage
        agent.post('/api/storages')
          .send(storage)
          .expect(200)
          .end(function (storageSaveErr, storageSaveRes) {
            // Handle Storage save error
            if (storageSaveErr) {
              return done(storageSaveErr);
            }

            // Delete an existing Storage
            agent.delete('/api/storages/' + storageSaveRes.body._id)
              .send(storage)
              .expect(200)
              .end(function (storageDeleteErr, storageDeleteRes) {
                // Handle storage error error
                if (storageDeleteErr) {
                  return done(storageDeleteErr);
                }

                // Set assertions
                (storageDeleteRes.body._id).should.equal(storageSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Storage if not signed in', function (done) {
    // Set Storage user
    storage.user = user;

    // Create new Storage model instance
    var storageObj = new Storage(storage);

    // Save the Storage
    storageObj.save(function () {
      // Try deleting Storage
      request(app).delete('/api/storages/' + storageObj._id)
        .expect(403)
        .end(function (storageDeleteErr, storageDeleteRes) {
          // Set message assertion
          (storageDeleteRes.body.message).should.match('User is not authorized');

          // Handle Storage error error
          done(storageDeleteErr);
        });

    });
  });

  it('should be able to get a single Storage that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Storage
          agent.post('/api/storages')
            .send(storage)
            .expect(200)
            .end(function (storageSaveErr, storageSaveRes) {
              // Handle Storage save error
              if (storageSaveErr) {
                return done(storageSaveErr);
              }

              // Set assertions on new Storage
              (storageSaveRes.body.name).should.equal(storage.name);
              should.exist(storageSaveRes.body.user);
              should.equal(storageSaveRes.body.user._id, orphanId);

              // force the Storage to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Storage
                    agent.get('/api/storages/' + storageSaveRes.body._id)
                      .expect(200)
                      .end(function (storageInfoErr, storageInfoRes) {
                        // Handle Storage error
                        if (storageInfoErr) {
                          return done(storageInfoErr);
                        }

                        // Set assertions
                        (storageInfoRes.body._id).should.equal(storageSaveRes.body._id);
                        (storageInfoRes.body.name).should.equal(storage.name);
                        should.equal(storageInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Storage.remove().exec(done);
    });
  });
});
