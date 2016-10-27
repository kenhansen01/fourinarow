import express = require('express');
import { MongoUtils } from '../db';

import { Gameplay } from '../client/app/interfaces/Gameplay';
import { Game } from '../client/app/interfaces/Game';

const router = express.Router();

// Connect to database, use gameplay Collection
const db = new MongoUtils('dbsConnectFour', 'gameplay', 'mongodb://localhost:27017/');

let currentGameplay: Gameplay = {
  _id: '',
  game: '',
  playerGreenMoves: [],
  playerGreyMoves: [],
  winner: 'playing',
  gameGrid: [
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty'],
  ]
};

let moveCount = 0;

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
  newGame(req.body.game);
  db.saveItem(req.body)
    .subscribe(
    saveRes => {
      currentGameplay._id = saveRes.insertedId.toHexString();
      res.json({ _id: currentGameplay._id });
    },
    err => res.send(err))
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
  moveMade(req.body.columnNumber);
  let gameplay = {
    game: currentGameplay.game,
    playerGreenMoves: currentGameplay.playerGreenMoves,
    playerGreyMoves: currentGameplay.playerGreyMoves,
    gameGrid: currentGameplay.gameGrid,
    winner: currentGameplay.winner
  };
  db.updateItem(currentGameplay._id, gameplay)
    .subscribe(
    updateRes => res.json(updateRes),
    err => res.send(err));
});

export = router;

/**
 * Sets up a new game object.
 * @param {Game} gameObject
 */
function newGame(gameId: string) {
  if (gameId) {
    currentGameplay.game = gameId;
    currentGameplay.playerGreenMoves = [];
    currentGameplay.playerGreyMoves = [];
    currentGameplay.gameGrid = [
      ['empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty'],
    ];
    currentGameplay.winner = 'playing';
    moveCount = 0;
  } else {
    console.log('New game goofed up??? ', gameId);
  }
};

/**
 * Calculates the move, pushes move to the right player and sets the winner.
 * @param columnNumber
 */
function moveMade(columnNumber: number) {

  let move = calcMove(columnNumber);
  let moveColor = 'green';

  if (moveCount === 0 || moveCount % 2 === 0) {
    currentGameplay.playerGreenMoves.push(move);
    moveColor = 'green';
  } else {
    currentGameplay.playerGreyMoves.push(move);
    moveColor = 'grey';
  }
  currentGameplay.gameGrid[move.x][move.y] = moveColor;
  moveCount++;

  let isWinner = theWinnerIs();
  if (isWinner !== 'playing') {
    currentGameplay.winner = isWinner;
  }
};

/**
 * Calculates the move coords based on the column
 * @param {number} columnNumber calculates the row based on the column passed and the number of moves in this column so far.
 * @return {MoveObject} move coordinates
 */
function calcMove(columnNumber: number) {
  if (moveCount === 0) {
    return { x: columnNumber, y: 4 };
  }

  let allColumnMoves = currentGameplay.playerGreyMoves.length > 0 ?
    currentGameplay.playerGreenMoves
      .filter(move => move.x === columnNumber)
      .concat(currentGameplay.playerGreyMoves
        .filter(move => move.x === columnNumber)) :
    currentGameplay.playerGreenMoves
      .filter(move => move.x === columnNumber);

  let row = 0;
  switch (allColumnMoves.length) {
    case 0:
      row = 4;
      break;
    case 1:
      row = 3;
      break;
    case 2:
      row = 2;
      break;
    case 3:
      row = 1;
      break;
    case 4:
      row = 0;
      break;
    default:
      break;
  };

  return { x: columnNumber, y: row };
}

function theWinnerIs() {
  if (currentGameplay.playerGreenMoves.length < 4) {
    return 'playing';
  }

  let chipInnaRowCount = 1;

  let rowCheck = (chip: string, rowidx: number, array: string[]) => {
    while (
      chipInnaRowCount < 4 &&
      chip === array[rowidx + 1]
    ) {
      rowidx++;
      chipInnaRowCount++
    }
    // We have a winner
    if (chipInnaRowCount >= 4) {
      return true;
    }
    // No win, reset
    chipInnaRowCount = 1;
    return false;
  }

  let colCheck = (chip: string, colidx: number, rowidx: number, array: string[][]) => {
    while (
      chipInnaRowCount < 4 &&
      chip === array[colidx + 1][rowidx]
    ) {
      colidx++;
      chipInnaRowCount++;
    }
    // We have a winner
    if (chipInnaRowCount >= 4) {
      return true;
    }
    // No win, reset
    chipInnaRowCount = 1;
    return false;
  }

  let diagCheck = (chip: string, colidx: number, rowidx: number, array: string[][]) => {
    // Diagonal Up
    while (
      colidx + 1 < 7 &&
      rowidx + 1 < 5 &&
      chipInnaRowCount < 4 &&
      chip === array[colidx + 1][rowidx + 1]
    ) {
      colidx++;
      rowidx++;
      chipInnaRowCount++
    }
    // We have a winner
    if (chipInnaRowCount >= 4) {
      return true;
    }
    // No win, reset
    chipInnaRowCount = 1;

    // Diagonal Down
    while (
      colidx + 1 < 7 &&
      rowidx - 1 > -1 &&
      chipInnaRowCount < 4 &&
      chip === array[colidx + 1][rowidx - 1]
    ) {
      colidx++;
      rowidx--;
      chipInnaRowCount++
    }
    // We have a winner
    if (chipInnaRowCount >= 4) {
      return true;
    }
    // No win, reset
    chipInnaRowCount = 1;
    return false;
  }

  let theWinner = () => {
    let winner = 'playing';
    currentGameplay.gameGrid.some((column, columnidx, colRowArray) => {
      return column.some((chip, rowidx, chipColArray) => {
        let checkRowIndex = rowidx;
        let checkColIndex = columnidx;
        // if this is an empty chip
        if (chip == 'empty') {
          winner = winner;
          return false;
        }
        if (
          rowCheck(chip, checkRowIndex, chipColArray) ||
          colCheck(chip, checkColIndex, rowidx, colRowArray) ||
          diagCheck(chip, checkColIndex, rowidx, colRowArray)
        ) {
          winner = chip;
          return true;
        } else if (currentGameplay.playerGreenMoves.length + currentGameplay.playerGreyMoves.length === 35) {
          winner = 'tie';
          return true;
        }
        return false;
      })
    })
    return winner;
  }
  return theWinner();
}