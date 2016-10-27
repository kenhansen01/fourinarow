import express = require('express');
import { MongoUtils } from '../db';

const router = express.Router();
// Connect to database, use games Collection
let db = new MongoUtils('dbsConnectFour', 'games', 'mongodb://localhost:27017/',);

/**
 * Get all games from database
 */
router.get('/games', (req, res, next) =>
  db.getAll()
    .subscribe(
    gamesResponse => res.json(gamesResponse),
    err => res.send(err))
);

/**
 * Get a specific game by id
 */
router.get('/game/:id', (req, res, next) =>
  db.getOneById(req.params.id)
    .subscribe(
    gameResponse => res.json(gameResponse),
    err => res.send(err))
);

/**
 * Save new game to database
 */
router.post('/game', (req, res, next) =>
  db.saveItem(req.body)
    .subscribe(
    saveRes => res.json({ _id: saveRes.insertedId.toHexString() }),
    err => res.send(err))
);

/**
 * Delete game from database
 */
router.delete('/game/:id', (req, res, next) => db.deleteItemById(req.params.id)
  .subscribe(
  deleteRes => deleteRes,
  err => res.send(err))
);

/**
 * Update an existing game in database
 */
router.put('/game/:id', (req, res, next) => {
  let game = {
    playerGreen: req.body.playerGreen,
    playerGrey: req.body.playerGrey,
    winner: req.body.winner,
    createdAt: req.body.createdAt
  };
  db.updateItem(req.body._id, game)
    .subscribe(
    updateRes => updateRes,
    err => res.send(err));
});

export = router;