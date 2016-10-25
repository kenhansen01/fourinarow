import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Player } from '../interfaces/Player';

@Injectable()
export class PlayerService {
  constructor(private http: Http) {
    console.log('Task service initialized')
  }

  getPlayers() {
    return this.http.get('/api/players')
      .map(res => res.json());
  }

  addPlayer(newPlayer: Player) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.request('/api/player', {
      method: 'POST',
      body: newPlayer,
      headers: headers
    })
      .map(res => res);
  }

  deletePlayer(id: string) {
    return this.http.delete(`/api/player/${id}`)
      .map(res => res.json());
  }

  updateStatus(player: Player) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.request(`/api/player/${player._id}`, {
      method: 'PUT',
      body: player,
      headers: headers
    })
      .map(res => res);
  }
}