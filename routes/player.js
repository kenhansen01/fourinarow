"use strict";
var express = require('express');
var db_1 = require('../db');
var router = express.Router();
var db = new db_1.MongoUtils('dbsConnectFour', 'players', 'mongodb://localhost:27017/');
router.get('/players', function (req, res, next) {
    db.getAll().subscribe(function (playersResponse) {
        return res.json(playersResponse);
    }, function (err) { return res.send(err); });
});
router.get('/player/:id', function (req, res, next) {
    db.getOneById(req.params.id).subscribe(function (playerResponse) { return res.json(playerResponse); }, function (err) { return res.send(err); });
});
router.post('/player', function (req, res, next) {
    db.saveItem(req.body)
        .subscribe(function (saveRes) {
        return res.json(saveRes);
    }, function (err) { return res.send(err); });
});
router.delete('/player/:id', function (req, res, next) { return db.deleteItemById(req.params.id).subscribe(function (deleteRes) { return res.json(deleteRes); }, function (err) { return res.send(err); }); });
router.put('/player/:id', function (req, res, next) {
    var player = {
        username: req.body.username,
        isTwiter: req.body.isTwitter,
        gender: req.body.gender,
        country: req.body.country,
        certified: req.body.certified,
        experience: req.body.experience,
        jobTitle: req.body.jobTitle
    };
    db.updateItem(req.body._id, player).subscribe(function (updateRes) { return res.json(updateRes); }, function (err) { return res.send(err); });
});
module.exports = router;
//# sourceMappingURL=player.js.map