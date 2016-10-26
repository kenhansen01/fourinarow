import express = require('express');
import { MongoUtils } from '../db';

const router = express.Router();
// Connect to database, use playerInfo Collection
let db = new MongoUtils('dbsConnectFour', 'players', 'mongodb://localhost:27017/',);

/**
 * Get all players from database
 */
router.get('/players', (req, res, next) =>
  db.getAll()
    .subscribe(
    playersResponse => res.json(playersResponse),
    err => res.send(err))
);

/**
 * Get a specific player by id
 */
router.get('/player/:id', (req, res, next) =>
  db.getOneById(req.params.id)
    .subscribe(
    playerResponse => res.json(playerResponse),
    err => res.send(err))
);

/**
 * Save new player to database
 */
router.post('/player', (req, res, next) =>
  db.saveItem(req.body)
    .subscribe(
    saveRes => res.json({ _id: saveRes.insertedId.toHexString() }),
    err => res.send(err))
);

/**
 * Delete player from database
 */
router.delete('/player/:id', (req, res, next) => db.deleteItemById(req.params.id)
  .subscribe(
  deleteRes => res.json(deleteRes),
  err => res.send(err))
);

/**
 * Update an existing player in database
 */
router.put('/player/:id', (req, res, next) => {
  let player = {
    username: req.body.username,
    isTwiter: req.body.isTwitter,
    gender: req.body.gender,
    country: req.body.country,
    certified: req.body.certified,
    experience: req.body.experience,
    jobTitle: req.body.jobTitle
  };
  db.updateItem(req.body._id, player)
    .subscribe(
    updateRes => res.json(updateRes),
    err => res.send(err));
});

export = router;