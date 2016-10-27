﻿import { Component } from '@angular/core';
import * as socketio from 'socket.io-client';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';

import { PlayerService } from '../../services/player.service';
import { GameService } from '../../services/game.service';
import { GameplayService } from '../../services/gameplay.service';

import { Player } from '../../interfaces/Player';
import { Game } from '../../interfaces/Game';
import { Gameplay } from '../../interfaces/Gameplay';

//const socket = socketio('http://localhost:3000');

@Component({
  moduleId: module.id,
  templateUrl: 'gamestart.component.html',
  styleUrls: ['css/structure.css']
})

export class GamestartComponent {

  socket: SocketIOClient.Socket;
  allPlayers: Player[];
  newGame: Game;
  gameInPlay: Game;
  currentGameplay: Gameplay = {
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

  gameGrid: string[][] = this.currentGameplay.gameGrid;

  player1: Player = null;
  player2: Player = null;

  showPlayers1: boolean = false;
  showPlayers2: boolean = false;
  showGameBoard: boolean = false;

  constructor(
    private playerService: PlayerService,
    private gameService: GameService,
    private gameplayService: GameplayService
  ) {
    this.playerService.getPlayers().subscribe(players => this.allPlayers = players);
    this.socket = socketio('http://localhost:3000');

    let winListener = Observable.fromEvent(this.socket, 'winner');
    winListener.subscribe(
      winner => this.endGame(winner));
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
      .mergeMap((gameResult: Game) => {
        this.gameInPlay = gameResult;
        return this.startGameplay(gameResult);
      })
      .mergeMap(gameplayId =>
        this.getGameplay(gameplayId._id))
      .subscribe((gameplayResult: Gameplay) => {
        this.currentGameplay = gameplayResult;
        return gameplayResult;
      });
  }

  setCellClass(cellValue: string) {
    return {
      green: cellValue === 'green',
      grey: cellValue === 'grey'
    }
  }

  sendMove(event: Event, columnNumber: number) {
    event.preventDefault();
    event.stopPropagation();
    this.socket.emit('movemade', columnNumber);
    this.gameplayService.sendMove(columnNumber)
      .mergeMap(moveResponse => this.getGameplay(this.currentGameplay._id))
      .subscribe(gameplayResponse => {
        this.currentGameplay = gameplayResponse;
        this.gameGrid = gameplayResponse.gameGrid;
      });
  }

  endGame(winner: any) {
    alert(`Congratulations ${winner}!`);
    this.newGame = null;
    this.player1 = null;
    this.player2 = null;
    this.showPlayers1 = false;
    this.showPlayers2 = false;
    this.showGameBoard = false;
    this.gameInPlay = null;
    this.currentGameplay = {
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
  }

  private createGame(game: Game) {
    return this.gameService.newGame(game)
      .map(newGameResId => newGameResId._id);
  }

  private getNewGame(gameId: string) {
    return this.gameService.getOneGame(gameId)
      .map(gameRes => gameRes);
  }

  private startGameplay(gameResult: Game) {
    let newGameplay: Gameplay = {
      game: gameResult._id,
      gameGrid: this.currentGameplay.gameGrid
    }
    this.showGameBoard = true;
    this.socket.emit('newgame', { message: 'A new game has begun!', game: gameResult });
    return this.gameplayService.addGameplay(newGameplay)
      .map(gamePlayResult => gamePlayResult);
  }

  private getGameplay(gameplayId: string) {
    return this.gameplayService.getOneGameplay(gameplayId)
      .map(gameplayRes => gameplayRes);
  }

}