import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Game } from '../interfaces/Game';

@Injectable()
export class GameService {
  constructor(private http: Http) {
    console.log('Task service initialized')
  }

  getGames() {
    return this.http.get('/api/games')
      .map(res => res.json());
  }

  getOneGame(id: string) {
    return this.http.get(`/api/game/${id}`)
      .map(res => res.json());
  }

  newGame(newGame: Game) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.request('/api/game', {
      method: 'POST',
      body: newGame,
      headers: headers
    })
      .map(
      (res) => res.json());
  }

  cancelGame(id: string) {
    return this.http.delete(`/api/game/${id}`)
      .map(res => res.json());
  }

  updateWinner(game: Game) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.request(`/api/game/${game._id}`, {
      method: 'PUT',
      body: game,
      headers: headers
    })
      .map(res => res);
  }
}