var signup = function(username, email, password){
  MongoClient.connect(url);
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
}
