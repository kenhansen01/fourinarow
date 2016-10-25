import { Component } from '@angular/core';

import { PlayerService } from '../../services/player.service';
import { Player, Gender, Country, JobType, YearsExperience } from '../../interfaces/Player';

@Component({
  moduleId: module.id,
  selector: 'signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['css/animate.css', 'css/controls.css', 'css/structure.css']
})

export class SignupComponent {

  // Gets all gender strings from Enum
  genderOptions: string[] = Object.keys(Gender).map(k => Gender[<any>k]).filter(v => typeof v === 'string');

  // Gets all country strings from Enum
  countryOptions: string[] = Object.keys(Country).map(k => Country[<any>k]).filter(v => typeof v === 'string');

  // Gets all job strings from enum
  jobOptions: string[] = Object.keys(JobType).map(k => JobType[<any>k]).filter(v => typeof v === 'string');

  // Gets years experience from Array
  experienceOptions = YearsExperience;

  pageContainer: string = 'recessed';

  // Boolean triggers to move the form
  formVisible: boolean = false;
  signupStarted: boolean = false;
  nameEntered: boolean = false;
  genderEntered: boolean = false;
  showCountries: boolean = false;
  hideCountries: boolean = false;
  locationEntered: boolean = false;
  certificationEntered: boolean = false;
  experienceEntered: boolean = false;
  jobTypeEntered: boolean = false;
  submitting: boolean = false;
  formSubmitted: boolean = false;
  // Initialize the player
  player: Player = {
    username: '',
    isTwiter: false,
    gender: Gender['Fifth Plea'],
    country: Country['United States'],
    certified: null,
    experience: 1,
    jobTitle: null
  };

  constructor(private playerService: PlayerService) { }

  /**
   * Enable the form - Name & Gender are set via interpolation
   * @param {Event} event - The event from the form
   */
  startSignup(event: Event) {
    this.formVisible = true;
    setTimeout(() => {
      this.signupStarted = true;
    })
  }

  /**
   * Sets the player country and hides the selector
   * @param {Country} country - Selected country
   */
  countrySelector(country: Country) {
    this.player.country = country;
    this.showCountries = false;
    this.hideCountries = true;
    setTimeout(() => { this.locationEntered = true; }, 350);
  }

  /**
   * Sets the number of years experience, certification is set through interpolation
   * @param {number} years - number of years
   */
  setExperience(years: number) {
    this.player.experience = years;
    this.certificationEntered = true;
    this.experienceEntered = true;
  }

  /**
   * Resets all of the variables on the form so it is ready for the next player.
   */
  resetForm() {
    this.player = {
      username: '',
      isTwiter: false,
      gender: Gender['Fifth Plea'],
      country: Country['United States'],
      certified: null,
      experience: 1,
      jobTitle: null
    };

    this.submitting = false;
    this.signupStarted = false;
    this.nameEntered = false;
    this.genderEntered = false;
    this.showCountries = false;
    this.hideCountries = false;
    this.locationEntered = false;
    this.certificationEntered = false;
    this.experienceEntered = false;
    this.jobTypeEntered = false;
    this.formSubmitted = false;
  }

  /**
   * Submits the new player data to the database.
   */
  onSubmit() {
    console.log(this.player);
    this.jobTypeEntered = true;
    this.formVisible = false;
    setTimeout(() => {
      this.formSubmitted = true;
      this.submitting = true;

      // Send Player to db
      this.playerService.addPlayer(this.player)
        .subscribe(response => {
          response.ok ? console.log('Player added!') : console.log(`That didn't work!`)

          console.log(this.player);

          this.resetForm();
        });
    }, 3000);
  }
}