import { Component } from '@angular/core';
import * as socketio from 'socket.io-client';
import 'rxjs/add/operator/mergeMap';

import { PlayerService } from '../../services/player.service';
import { GameService } from '../../services/game.service';

import { Player } from '../../interfaces/Player';
import { Game } from '../../interfaces/Game';

const socket = socketio('http://localhost:3000');

@Component({
  moduleId: module.id,
  templateUrl: 'gamestart.component.html',
  styleUrls: ['css/structure.css']
})

export class GamestartComponent {

  allPlayers: Player[];
  newGame: Game;

  player1: Player = null;
  player2: Player = null;

  showPlayers1: boolean = false;
  showPlayers2: boolean = false;

  constructor(
    private playerService: PlayerService,
    private gameService: GameService
  ) {
    this.playerService.getPlayers().subscribe(players => this.allPlayers = players)
  }

  startGame(event: Event) {
    event.preventDefault();
    this.newGame = {
      playerGreen: this.player1._id,
      playerGrey: this.player2._id,
      winner: 'playing'
    }
    this.createGame(this.newGame)
      .mergeMap(newGameId =>
        this.getNewGame(newGameId))
      .subscribe(gameResult =>
        this.notifySocket(gameResult));
  }

  private createGame(game: Game) {
    return this.gameService.newGame(game)
      .map(newGameResId => newGameResId._id);
  }

  private getNewGame(gameId: string) {
    return this.gameService.getOneGame(gameId)
      .map((gameRes: any) => gameRes);
  }

  private notifySocket(gameResult: any) {
    socket.emit('newgame', { message: 'A new game has begun!', game: gameResult });
  }

  private startGameAndReturnIt() {
    return this.gameService.newGame(this.newGame)
      .mergeMap((newGameResponse: any) =>
        this.gameService.getOneGame(
          newGameResponse.insertedId.toHexString()
        ));
  }

}