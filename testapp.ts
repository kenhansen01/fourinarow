var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/dbsConnectFour';

MongoClient.connect(url, (err:any, db:any) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});