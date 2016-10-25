"use strict";
var express = require('express');
var db_1 = require('../db');
var router = express.Router();
var db = new db_1.MongoUtils('dbsConnectFour', 'games', 'mongodb://localhost:27017/');
router.get('/games', function (req, res, next) {
    return db.getAll()
        .subscribe(function (gamesResponse) {
        db.disconnectFromDb();
        res.json(gamesResponse);
    }, function (err) {
        db.disconnectFromDb();
        res.send(err);
    });
});
router.get('/game/:id', function (req, res, next) {
    return db.getOneById(req.params.id)
        .subscribe(function (gameResponse) {
        db.disconnectFromDb();
        res.json(gameResponse);
    }, function (err) {
        db.disconnectFromDb();
        res.send(err);
    });
});
router.post('/game', function (req, res, next) {
    return db.saveItem(req.body)
        .subscribe(function (saveRes) {
        db.disconnectFromDb();
        res.json({ _id: saveRes.insertedId.toHexString() });
    }, function (err) {
        db.disconnectFromDb();
        res.send(err);
    });
});
router.delete('/game/:id', function (req, res, next) { return db.deleteItemById(req.params.id)
    .subscribe(function (deleteRes) { return deleteRes; }, function (err) { return res.send(err); }); });
router.put('/game/:id', function (req, res, next) {
    var game = {
        playerGreen: req.body.playerGreen,
        playerGrey: req.body.playerGrey,
        winner: req.body.winner
    };
    db.updateItem(req.body._id, game)
        .subscribe(function (updateRes) { return updateRes; }, function (err) { return res.send(err); });
});
module.exports = router;
//# sourceMappingURL=game.js.map