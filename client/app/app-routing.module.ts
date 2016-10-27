import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
//import { GameplayComponent } from './components/gameplay/gameplay.component';
import { GamestartComponent } from './components/gamestart/gamestart.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/signup', pathMatch: 'full' },
      { path: 'signup', component: SignupComponent },
      //{ path: 'gameplay', component: GameplayComponent },
      { path: 'gamestart', component: GamestartComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
