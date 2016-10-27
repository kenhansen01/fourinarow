import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Player } from '../interfaces/Player';
import { Gameplay } from '../interfaces/Gameplay';

@Injectable()
export class GameplayService {
  constructor(private http: Http) {
    console.log('Task service initialized')
  }

  getGameplay() {
    return this.http.get('/api/gameplays')
      .map(res => res.json());
  }

  getOneGameplay(id: string) {
    return this.http.get(`/api/gameplay/${id}`)
      .map(res => res.json());
  }

  addGameplay(newGameplay: Gameplay) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.request('/api/gameplay', {
      method: 'POST',
      body: newGameplay,
      headers: headers
    })
      .map(res => res.json());
  }

  deleteGameplay(id: string) {
    return this.http.delete(`/api/gameplay/${id}`)
      .map(res => res.json());
  }

  sendMove(column: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.request(`/api/gameplay/move`, {
      method: 'PUT',
      body: { columnNumber: column },
      headers: headers
    })
      .map(res => res);
  }
}