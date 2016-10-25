import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SignupComponent } from './components/signup/signup.component';
import { GameplayComponent } from './components/gameplay/gameplay.component';
import { GamestartComponent } from './components/gamestart/gamestart.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    GameplayComponent,
    GamestartComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
