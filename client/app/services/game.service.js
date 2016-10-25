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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var GameService = (function () {
    function GameService(http) {
        this.http = http;
        console.log('Task service initialized');
    }
    GameService.prototype.getGames = function () {
        return this.http.get('/api/games')
            .map(function (res) { return res.json(); });
    };
    GameService.prototype.getOneGame = function (id) {
        return this.http.get("/api/game/" + id)
            .map(function (res) { return res.json(); });
    };
    GameService.prototype.newGame = function (newGame) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.request('/api/game', {
            method: 'POST',
            body: newGame,
            headers: headers
        })
            .map(function (res) { return res.json(); });
    };
    GameService.prototype.cancelGame = function (id) {
        return this.http.delete("/api/game/" + id)
            .map(function (res) { return res.json(); });
    };
    GameService.prototype.updateWinner = function (game) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.request("/api/game/" + game._id, {
            method: 'PUT',
            body: game,
            headers: headers
        })
            .map(function (res) { return res; });
    };
    GameService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map