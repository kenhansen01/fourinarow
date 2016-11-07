import 'jasmine';
import * as mongodb from 'mongodb';

import { MongoUtils } from '../db';
import * as reporter from '../../tools/jasmine.reporter';

let testItem = {
  _id: new mongodb.ObjectID(),
  username: 'Test_User',
  isTwiter: false,
  gender: 'Female',
  country: 'United States',
  certified: false,
  experience: 5,
  jobTitle: 'VP'
};

jasmine.getEnv().addReporter(reporter);

describe('testDatabase', () => {
  let mongoUtil: MongoUtils;
  let database: mongodb.Db;

  // bust require cache to force server reload
  beforeEach(() => {
    mongoUtil = new MongoUtils(); // Default server, 'test' Db, 'default' collection
    database = mongoUtil.database;
  });

  //afterEach((done) => {
  //  database.close(done);
  //});

  describe('Connect to database', () => {
    it('returns the collection name', (done) => {
      mongoUtil.connectToDb(mongoUtil.dbColl)
        .subscribe(collection => {
          expect(collection.collectionName).toBe(mongoUtil.dbColl);
          done();
        });
    });
  });

  describe('Add new item to the database', () => {
    it('returns JSON where insertedId equals item._id', (done) => {
      mongoUtil.saveItem(testItem).subscribe(insertResult => {
        expect(insertResult.insertedId).toBe(testItem._id);
        done();
      });
    });
  });

  describe('Get specific item by id', () => {
    it('returns JSON object that matches item', (done) => {
      mongoUtil.getOneById(testItem._id.toHexString())
        .subscribe(item => {
          expect(item.username).toBe(testItem.username);
          done();
        });
    });
  });

  describe('Update the user', () => {
    var changedItem = testItem;
    changedItem._id = undefined;
    changedItem.isTwiter = true;
    it('returns OK', (done) => {
      mongoUtil.updateItem(testItem._id.toHexString(), changedItem)
        .subscribe(updateResult => {
          expect(updateResult.result.ok).toBe(1);
          done();
        });
    });
  });

  describe('Get all items in the database', () => {
    it('Returns array of items', (done) => {
      mongoUtil.getAll().subscribe(items => {
        expect(items[0].username).toBe(testItem.username);
        done();
      });
    });
  });

  describe('delete item from database', () => {
    it('returns status ok', (done) => {
      mongoUtil.deleteItemById(testItem._id.toHexString()).subscribe(deleteResult => {
        expect(deleteResult.result.ok).toBe(1);
        done();
      });
    });
  });
});
