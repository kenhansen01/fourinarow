import { Component } from '@angular/core';
import { PlayerService } from './services/player.service';
import { GameService } from './services/game.service';
import { GameplayService } from './services/gameplay.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [PlayerService, GameService, GameplayService]
})

export class AppComponent { }
