"use strict";
var mongodb = require('mongodb');
var Rx = require('rxjs/Rx');
var MongoClient = new mongodb.MongoClient();
var MongoUtils = (function () {
    function MongoUtils(db, collection, connection) {
        this.mongoConnection = 'mongodb://localhost:27017/';
        this.mongoDb = 'test';
        this.dbColl = 'default';
        this.mongoConnection = connection || this.mongoConnection;
        this.mongoDb = db || this.mongoDb;
        this.dbColl = collection || this.dbColl;
        this.mongoUrl = this.mongoConnection + this.mongoDb;
    }
    MongoUtils.prototype.connectToDb = function (dbCollectionName) {
        var _this = this;
        return Rx.Observable.fromPromise(MongoClient.connect(this.mongoUrl))
            .map(function (db) { return _this.database = db; })
            .map(function (db) { return db.collection(dbCollectionName); });
    };
    MongoUtils.prototype.disconnectFromDb = function () {
        this.database.close();
    };
    MongoUtils.prototype.getAll = function () {
        return this.connectToDb(this.dbColl)
            .mergeMap(function (collection) {
            return Rx.Observable.fromPromise(collection.find().toArray());
        });
    };
    MongoUtils.prototype.getOneById = function (id) {
        return this.connectToDb(this.dbColl)
            .mergeMap(function (collection) {
            return Rx.Observable.fromPromise(collection.find({ _id: new mongodb.ObjectID(id) }).limit(1).next());
        });
    };
    MongoUtils.prototype.saveItem = function (item) {
        return this.connectToDb(this.dbColl)
            .mergeMap(function (collection) {
            return Rx.Observable.fromPromise(collection.insertOne(item));
        });
    };
    MongoUtils.prototype.deleteItemById = function (id) {
        return this.connectToDb(this.dbColl)
            .mergeMap(function (collection) {
            return Rx.Observable.fromPromise(collection.deleteOne({ _id: new mongodb.ObjectID(id) }));
        });
    };
    MongoUtils.prototype.updateItem = function (id, updatedItem) {
        return this.connectToDb(this.dbColl)
            .mergeMap(function (collection) {
            return Rx.Observable.fromPromise(collection.updateOne({ _id: new mongodb.ObjectID(id) }, { $set: updatedItem }));
        });
    };
    return MongoUtils;
}());
exports.MongoUtils = MongoUtils;
;
//# sourceMappingURL=db.js.map