"use strict";
var express = require('express');
var socketio = require('socket.io-client');
var db_1 = require('../db');
var socket = socketio('http://localhost:3000');
var router = express.Router();
var db = new db_1.MongoUtils('dbsConnectFour', 'gameplay', 'mongodb://localhost:27017/');
var gameId = '';
var greenMoves = [];
var greyMoves = [];
var moveCount = 0;
socket.on('newgame', function (gameObject) {
    console.log(gameObject.message);
    if (gameObject.game._id) {
        gameId = gameObject.game._id;
        greenMoves = gameObject.game.playerGreenMoves || [];
        greyMoves = gameObject.game.playerGreyMoves || [];
        moveCount = 0;
    }
    else {
        console.log('New game goofed up??? ', gameObject);
    }
});
socket.on('movemade', function (columnNumber) {
    var move = calcMove(columnNumber);
    if (moveCount === 0 || moveCount % 2 === 0) {
        greenMoves.push(move);
    }
    else {
        greyMoves.push(move);
    }
    var isWinner = theWinnerIs();
    if (isWinner !== 'playing') {
        if (isWinner === 'tie') {
            socket.emit('tie');
        }
        else {
            socket.emit('winner', isWinner);
        }
    }
});
function calcMove(columnNumber) {
    if (moveCount === 0) {
        return { x: columnNumber, y: 0 };
    }
    var allColumnMoves = greenMoves.filter(function (move) { return move.x === columnNumber; })
        .concat(greyMoves.filter(function (move) { return move.x === columnNumber; }));
    var rowArray = Array.from(allColumnMoves, function (move) { return move.y; });
    var highestRow = Math.max.apply(Math, rowArray);
    return { x: columnNumber, y: highestRow++ };
}
function theWinnerIs() {
    if (greenMoves.length < 4) {
        return 'playing';
    }
    if (greenMoves.length + greyMoves.length === 35) {
        return 'tie';
    }
    var grid = [
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
    ];
    greenMoves.forEach(function (move) { return grid[move.x][move.y] = 'Green'; });
    greyMoves.forEach(function (move) { return grid[move.x][move.y] = 'Grey'; });
    var chipInnaRowCount = 1;
    var rowCheck = function (chip, rowidx, array) {
        while (chipInnaRowCount < 4 &&
            chip === array[rowidx + 1]) {
            rowidx++;
            chipInnaRowCount++;
        }
        if (chipInnaRowCount >= 4) {
            return true;
        }
        chipInnaRowCount = 1;
        return false;
    };
    var colCheck = function (chip, colidx, rowidx, array) {
        while (chipInnaRowCount < 4 &&
            chip === array[colidx + 1][rowidx]) {
            colidx++;
            chipInnaRowCount++;
        }
        if (chipInnaRowCount >= 4) {
            return true;
        }
        chipInnaRowCount = 1;
        return false;
    };
    var diagCheck = function (chip, colidx, rowidx, array) {
        while (colidx + 1 < 7 &&
            rowidx + 1 < 5 &&
            chipInnaRowCount < 4 &&
            chip === array[colidx + 1][rowidx + 1]) {
            colidx++;
            rowidx++;
            chipInnaRowCount++;
        }
        if (chipInnaRowCount >= 4) {
            return true;
        }
        chipInnaRowCount = 1;
        while (colidx + 1 < 7 &&
            rowidx - 1 > -1 &&
            chipInnaRowCount < 4 &&
            chip === array[colidx + 1][rowidx - 1]) {
            colidx++;
            rowidx--;
            chipInnaRowCount++;
        }
        if (chipInnaRowCount >= 4) {
            return true;
        }
        chipInnaRowCount = 1;
        return false;
    };
    var theWinner = function () {
        var winner = 'playing';
        grid.some(function (column, columnidx, colRowArray) {
            return column.some(function (chip, rowidx, chipColArray) {
                var checkRowIndex = rowidx;
                var checkColIndex = columnidx;
                if (chip == 'empty') {
                    winner = winner;
                    return false;
                }
                if (rowCheck(chip, checkRowIndex, chipColArray) ||
                    colCheck(chip, checkColIndex, rowidx, colRowArray) ||
                    diagCheck(chip, checkColIndex, rowidx, colRowArray)) {
                    winner = chip;
                    return true;
                }
                return false;
            });
        });
        return winner;
    };
    return theWinner();
}
router.get('/gameplays', function (req, res, next) {
    db.getAll().subscribe(function (gameplaysResponse) { return res.json(gameplaysResponse); }, function (err) { return res.send(err); });
});
router.get('/gameplay/:id', function (req, res, next) {
    db.getOneById(req.params.id).subscribe(function (gameplayResponse) { return res.json(gameplayResponse); }, function (err) { return res.send(err); });
});
router.post('/gameplay', function (req, res, next) {
    db.saveItem(req.body)
        .subscribe(function (saveRes) {
        return res.json(saveRes);
    }, function (err) { return res.send(err); });
});
router.delete('/gameplay/:id', function (req, res, next) { return db.deleteItemById(req.params.id).subscribe(function (deleteRes) { return res.json(deleteRes); }, function (err) { return res.send(err); }); });
router.put('/gameplay/:id', function (req, res, next) {
    socket.on('playmove', function (data) {
    });
    var greenMoves = req.body.playerGreenMoves || [];
    var greyMoves = req.body.playerGreyMoves || [];
    var gameplay = {
        playerGreenMoves: req.body.playerGreenMoves,
        playerGreyMoves: req.body.playerGreyMoves,
    };
    db.updateItem(req.body._id, gameplay).subscribe(function (updateRes) { return res.json(updateRes); }, function (err) { return res.send(err); });
});
module.exports = router;
//# sourceMappingURL=gameplay.js.map