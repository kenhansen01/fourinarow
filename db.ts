import mongodb = require('mongodb');
import * as Rx from 'rxjs/Rx';

const MongoClient = new mongodb.MongoClient();

/**
 * Utility class to access database as Observables
 */
export class MongoUtils {
  mongoConnection: string = 'mongodb://localhost:27017/';
  mongoDb: string = 'test';
  dbColl: string = 'default';
  mongoUrl: string;

  database: mongodb.Db;

  constructor(db?: string, collection?: string, connection?: string) {
    this.mongoConnection = connection || this.mongoConnection;
    this.mongoDb = db || this.mongoDb;
    this.dbColl = collection || this.dbColl;

    this.mongoUrl = this.mongoConnection + this.mongoDb;
  }

  /**
   * Connection to database that opens the specified collection
   * @param {string} dbCollectionName - Name of the collection on the database
   * @return {Rx.Observable} - Observable of the collection in the db
   */
  private connectToDb(dbCollectionName: string): Rx.Observable<any> {
    return Rx.Observable.fromPromise(MongoClient.connect(this.mongoUrl))
      .map((db: mongodb.Db) => this.database = db)
      .map((db: mongodb.Db) => db.collection(dbCollectionName));
  }

  /**
   * Closes connection to database.
   */
  disconnectFromDb() {
    this.database.close()
  }

  /**
   * Gets all the items
   * @return {Rx.Observable} - Observable of all items in db
   */
  getAll(): Rx.Observable<any> {
    return this.connectToDb(this.dbColl)
      .mergeMap((collection: mongodb.Collection) =>
        Rx.Observable.fromPromise(collection.find().toArray()));
  }

  /**
   * Get a single item
   * @param {string} id - the id of the item to find
   * @return {Rx.Observable} - Observable of a single item
   */
  getOneById(id: string): Rx.Observable<any> {
    return this.connectToDb(this.dbColl)
      .mergeMap((collection: mongodb.Collection) =>
        Rx.Observable.fromPromise(collection.find({ _id: new mongodb.ObjectID(id) }).limit(1).next()));
  }

  /**
   * Save a new item to the db
   * @param {any} item - Item to save to the db
   * @return {Rx.Observable} - Observable that returns a success value
   */
  saveItem(item: any): Rx.Observable<any> {
    return this.connectToDb(this.dbColl)
      .mergeMap((collection: mongodb.Collection) =>
        Rx.Observable.fromPromise(collection.insertOne(item)));
  }

  /**
   * Delete a specific item from the db
   * @param {string} id - id of the item to remove
   * @return {Rx.Observable} - Observable with response from delete operation
   */
  deleteItemById(id: string): Rx.Observable<any> {
    return this.connectToDb(this.dbColl)
      .mergeMap((collection: mongodb.Collection) =>
        Rx.Observable.fromPromise(collection.deleteOne({ _id: new mongodb.ObjectID(id) })));
  }

  /**
   * Update an existing item
   * @param {string} id - id of the existing item to update
   * @param {Task} updTask - new values for the item
   * @return {Rx.Observable} - Observable for the update, this is an empty response when successful. 
   */
  updateItem(id: string, updatedItem: any): Rx.Observable<any> {
    return this.connectToDb(this.dbColl)
      .mergeMap((collection: mongodb.Collection) =>
        Rx.Observable.fromPromise(collection.updateOne({ _id: new mongodb.ObjectID(id) }, { $set: updatedItem })));
  }
};