import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { GamestartComponent } from './components/gamestart/gamestart.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/signup', pathMatch: 'full' },
      { path: 'signup', component: SignupComponent },
      { path: 'gamestart', component: GamestartComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
