import express = require('express');
import * as socketio from 'socket.io-client';
import { MongoUtils } from '../db';

const socket = socketio('http://localhost:3000');

const router = express.Router();

// Connect to database, use gameplay Collection
const db = new MongoUtils('dbsConnectFour', 'gameplay', 'mongodb://localhost:27017/');

let gameId: string = '';
let greenMoves: { x: number, y: number }[] = [];
let greyMoves: { x: number, y: number }[] = [];
let moveCount: number = 0;

socket.on('newgame', (gameObject: any) => {
  console.log(gameObject.message);
  if (gameObject.game._id) {
    gameId = gameObject.game._id;
    greenMoves = gameObject.game.playerGreenMoves || [];
    greyMoves = gameObject.game.playerGreyMoves || [];
    moveCount = 0;
  } else {
    console.log('New game goofed up??? ', gameObject);
  }
});

socket.on('movemade', (columnNumber: number) => {

  let move = calcMove(columnNumber);

  if (moveCount === 0 || moveCount % 2 === 0) {
    greenMoves.push(move)
  } else {
    greyMoves.push(move);
  }
  let isWinner = theWinnerIs();
  if (isWinner !== 'playing') {
    if (isWinner === 'tie') {
      socket.emit('tie');
    } else {
      socket.emit('winner', isWinner)
    }
  }
});

function calcMove(columnNumber: number) {
  if (moveCount === 0) {
    return { x: columnNumber, y: 0 };
  }

  let allColumnMoves = greenMoves.filter(move => move.x === columnNumber)
    .concat(greyMoves.filter(move => move.x === columnNumber));

  let rowArray = Array.from(allColumnMoves, move => move.y);

  let highestRow = Math.max.apply(Math, rowArray);

  return { x: columnNumber, y: highestRow++ };
}

function theWinnerIs() {
  if (greenMoves.length < 4) {
    return 'playing';
  }
  if (greenMoves.length + greyMoves.length === 35) {
    return 'tie'
  }
  let grid = [
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty'],
  ];

  greenMoves.forEach(move => grid[move.x][move.y] = 'Green')
  greyMoves.forEach(move => grid[move.x][move.y] = 'Grey')

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
    grid.some((column, columnidx, colRowArray) => {
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
        }
        return false;          
      })
    })
    return winner;
  }
  return theWinner();
}

/**
 * Get all gameplays from database
 */
router.get('/gameplays', (req, res, next) => {
  db.getAll().subscribe(gameplaysResponse => res.json(gameplaysResponse), err => res.send(err));
});

/**
 * Get a specific gameplay by id
 */
router.get('/gameplay/:id', (req, res, next) => {
  db.getOneById(req.params.id).subscribe(gameplayResponse => res.json(gameplayResponse), err => res.send(err));
});

/**
 * Save new gameplay to database
 */
router.post('/gameplay', (req, res, next) => {
  db.saveItem(req.body)
    .subscribe(saveRes =>
      res.json(saveRes),
      err => res.send(err));
});

/**
 * Delete gameplay from database
 */
router.delete('/gameplay/:id', (req, res, next) => db.deleteItemById(req.params.id).subscribe(deleteRes => res.json(deleteRes), err => res.send(err)));

/**
 * Update an existing gameplay in database
 */
router.put('/gameplay/:id', (req, res, next) => {
  socket.on('playmove', (data: number) => {

  });

  let greenMoves = req.body.playerGreenMoves || [];
  let greyMoves = req.body.playerGreyMoves || [];
  let gameplay = {
    playerGreenMoves: req.body.playerGreenMoves,
    playerGreyMoves: req.body.playerGreyMoves,
  };
  db.updateItem(req.body._id, gameplay).subscribe(updateRes => res.json(updateRes), err => res.send(err));
});

export = router;