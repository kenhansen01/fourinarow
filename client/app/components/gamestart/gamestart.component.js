"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var socketio = require('socket.io-client');
require('rxjs/add/operator/mergeMap');
var player_service_1 = require('../../services/player.service');
var game_service_1 = require('../../services/game.service');
var socket = socketio('http://localhost:3000');
var GamestartComponent = (function () {
    function GamestartComponent(playerService, gameService) {
        var _this = this;
        this.playerService = playerService;
        this.gameService = gameService;
        this.player1 = null;
        this.player2 = null;
        this.showPlayers1 = false;
        this.showPlayers2 = false;
        this.playerService.getPlayers().subscribe(function (players) { return _this.allPlayers = players; });
    }
    GamestartComponent.prototype.startGame = function (event) {
        var _this = this;
        event.preventDefault();
        this.newGame = {
            playerGreen: this.player1._id,
            playerGrey: this.player2._id,
            winner: 'playing'
        };
        this.createGame(this.newGame)
            .mergeMap(function (newGameId) {
            return _this.getNewGame(newGameId);
        })
            .subscribe(function (gameResult) {
            return _this.notifySocket(gameResult);
        });
    };
    GamestartComponent.prototype.createGame = function (game) {
        return this.gameService.newGame(game)
            .map(function (newGameResId) { return newGameResId._id; });
    };
    GamestartComponent.prototype.getNewGame = function (gameId) {
        return this.gameService.getOneGame(gameId)
            .map(function (gameRes) { return gameRes; });
    };
    GamestartComponent.prototype.notifySocket = function (gameResult) {
    };
    GamestartComponent.prototype.startGameAndReturnIt = function () {
        var _this = this;
        return this.gameService.newGame(this.newGame)
            .mergeMap(function (newGameResponse) {
            return _this.gameService.getOneGame(newGameResponse.insertedId.toHexString());
        });
    };
    GamestartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'gamestart.component.html',
            styleUrls: ['css/structure.css']
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService, game_service_1.GameService])
    ], GamestartComponent);
    return GamestartComponent;
}());
exports.GamestartComponent = GamestartComponent;
//# sourceMappingURL=gamestart.component.js.map