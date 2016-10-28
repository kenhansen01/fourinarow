import express = require('express');
import { MongoUtils } from '../db';

import { GameplayUtils } from '../utilities/gameplay.utilities';
import { Gameplay } from '../client/app/interfaces/Gameplay';

const router = express.Router();
const gameplay = new GameplayUtils();

// Connect to database, use gameplay Collection
const db = new MongoUtils('dbsConnectFour', 'gameplay', 'mongodb://localhost:27017/');

let currentGameplay: Gameplay = gameplay.newGame();

let returnRouter = (io: SocketIO.Server) => {
  /**
   * Get all gameplays from database
   */
  router.get('/gameplays', (req, res, next) =>
    db.getAll()
      .subscribe(
      gameplaysResponse => res.json(gameplaysResponse),
      err => res.send(err))
  );

  /**
   * Get a specific gameplay by id
   */
  router.get('/gameplay/:id', (req, res, next) =>
    db.getOneById(req.params.id)
      .subscribe(
      gameplayResponse => res.json(gameplayResponse),
      err => res.send(err))
  );

  /**
   * Save new gameplay to database
   */
  router.post('/gameplay', (req, res, next) => {
    currentGameplay = gameplay.newGame(req.body.game);
    db.saveItem(req.body)
      .subscribe(
      saveRes => {
        currentGameplay._id = saveRes.insertedId.toHexString();
        res.json({ _id: currentGameplay._id });
      },
      err => res.send(err));
  });

  /**
   * Delete gameplay from database
   */
  router.delete('/gameplay/:id', (req, res, next) => db.deleteItemById(req.params.id)
    .subscribe(
    deleteRes => res.json(deleteRes),
    err => res.send(err))
  );

  /**
   * Update an existing gameplay in database
   */
  router.put('/gameplay/move', (req, res, next) => {
    let gpId = currentGameplay._id;
    currentGameplay = gameplay.moveMade(req.body.columnNumber);
    let moveGameplay: Gameplay = {
      playerGreenMoves: currentGameplay.playerGreenMoves,
      playerGreyMoves: currentGameplay.playerGreyMoves,
      gameGrid: currentGameplay.gameGrid,
      winner: currentGameplay.winner,
      game: currentGameplay.game
    };

    db.updateItem(gpId, moveGameplay)
      .subscribe(
      updateRes => {
        io.sockets.emit('movemade', updateRes);
        res.json(updateRes);
      },
      err => res.send(err));
  });

  return router;
};

export = returnRouter;
