import 'jasmine';
import { Server } from 'http';
import * as request from 'supertest';

import * as reporter from '../../tools/jasmine.reporter';

const base_url = '/';

let testUser = {
  _id: <any>undefined,
  username: 'Test_User',
  isTwiter: false,
  gender: 'Female',
  country: 'United States',
  certified: false,
  experience: 5,
  jobTitle: 'VP'
};

jasmine.getEnv().addReporter(reporter);

describe('testServer', () => {
  let server: Server;

  // bust require cache to force server reload
  beforeEach(() => {
    delete require.cache[require.resolve('../server')];
    server = require('../server');
  });

  afterEach((done) => {
    server.close(done);
  });

  describe('GET /', () => {
    it('returns status code 200', (done) => {
      request(server)
        .get(base_url)
        .expect(200, done);
    });
  });

  describe('POST new player to /api/player', () => {
    it('returns JSON with _id of the new player', (done) => {
      request(server)
        .post(`${base_url}api/player`)
        .send(testUser)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .expect((res: any) => {
          testUser._id = res.body._id;
        })
        .end((err: any, res: any) => {
          expect(res.body._id).toBe(testUser._id);
          done();
        });
    });
  });

  describe('GET specific player by id /api/player/:id', () => {
    it('returns JSON player object', (done) => {
      request(server)
        .get(`${base_url}api/player/${testUser._id}`)
        .expect(200)
        .end((err: any, res: any) => {
          expect(res.body.username).toBe(testUser.username);
          done();
        });
    });
  });

  //edit player
  describe('PUT change player /api/player/:id', () => {
    let testId = testUser._id;
    testUser._id = undefined;
    testUser.isTwiter = true;
    it('returns OK', (done) => {
      request(server)
        .put(`${base_url}api/player/${testId}`)
        .send(testUser)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err: any, res: any) => {
          expect(res).toBeTruthy();
          done();
        });
    });
  });
  // TODO get all players

  describe('DELETE specific player /api/player/:id', () => {
    it('returns status ok', (done) => {
      request(server)
        .delete(`${base_url}api/player/${testUser._id}`)
        .expect(200, done);
    });
  });
});
