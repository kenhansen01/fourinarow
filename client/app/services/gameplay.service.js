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
var PlayerService = (function () {
    function PlayerService(http) {
        this.http = http;
        console.log('Task service initialized');
    }
    PlayerService.prototype.getPlayers = function () {
        return this.http.get('/api/players')
            .map(function (res) { return res.json(); });
    };
    PlayerService.prototype.addPlayer = function (newPlayer) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.request('/api/player', {
            method: 'POST',
            body: newPlayer,
            headers: headers
        })
            .map(function (res) { return res; });
    };
    PlayerService.prototype.deletePlayer = function (id) {
        return this.http.delete("/api/player/" + id)
            .map(function (res) { return res.json(); });
    };
    PlayerService.prototype.updateStatus = function (player) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.request("/api/player/" + player._id, {
            method: 'PUT',
            body: player,
            headers: headers
        })
            .map(function (res) { return res; });
    };
    PlayerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
//# sourceMappingURL=gameplay.service.js.map