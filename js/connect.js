var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/userInfo';

var insertDocument = function(db, callback) {
  db.collection('users').insertOne( {
    "userInfo": {
      "uid" : 1,
      "username" : "septimus",
      "firstName" : "Wesley",
      "lastName" : "McCann",
      "email" : "septimus98@gmail.com",
      "password" : "testpass"
    },
  }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the users collection.");
    callback(result);
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});
