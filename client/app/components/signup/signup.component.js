"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var player_service_1 = require('../../services/player.service');
var Player_1 = require('../../interfaces/Player');
var SignupComponent = (function () {
    function SignupComponent(playerService) {
        this.playerService = playerService;
        this.genderOptions = Object.keys(Player_1.Gender).map(function (k) { return Player_1.Gender[k]; }).filter(function (v) { return typeof v === 'string'; });
        this.countryOptions = Object.keys(Player_1.Country).map(function (k) { return Player_1.Country[k]; }).filter(function (v) { return typeof v === 'string'; });
        this.jobOptions = Object.keys(Player_1.JobType).map(function (k) { return Player_1.JobType[k]; }).filter(function (v) { return typeof v === 'string'; });
        this.experienceOptions = Player_1.YearsExperience;
        this.pageContainer = 'recessed';
        this.formVisible = false;
        this.signupStarted = false;
        this.nameEntered = false;
        this.genderEntered = false;
        this.showCountries = false;
        this.hideCountries = false;
        this.locationEntered = false;
        this.certificationEntered = false;
        this.experienceEntered = false;
        this.jobTypeEntered = false;
        this.submitting = false;
        this.formSubmitted = false;
        this.player = {
            username: '',
            isTwiter: false,
            gender: Player_1.Gender['Fifth Plea'],
            country: Player_1.Country['United States'],
            certified: null,
            experience: 1,
            jobTitle: null
        };
    }
    SignupComponent.prototype.startSignup = function (event) {
        var _this = this;
        this.formVisible = true;
        setTimeout(function () {
            _this.signupStarted = true;
        });
    };
    SignupComponent.prototype.countrySelector = function (country) {
        var _this = this;
        this.player.country = country;
        this.showCountries = false;
        this.hideCountries = true;
        setTimeout(function () { _this.locationEntered = true; }, 350);
    };
    SignupComponent.prototype.setExperience = function (years) {
        this.player.experience = years;
        this.certificationEntered = true;
        this.experienceEntered = true;
    };
    SignupComponent.prototype.resetForm = function () {
        this.player = {
            username: '',
            isTwiter: false,
            gender: Player_1.Gender['Fifth Plea'],
            country: Player_1.Country['United States'],
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
    };
    SignupComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.player);
        this.jobTypeEntered = true;
        this.formVisible = false;
        setTimeout(function () {
            _this.formSubmitted = true;
            _this.submitting = true;
            _this.playerService.addPlayer(_this.player)
                .subscribe(function (response) {
                response.ok ? console.log('Player added!') : console.log("That didn't work!");
                console.log(_this.player);
                _this.resetForm();
            });
        }, 3000);
    };
    SignupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'signup',
            templateUrl: 'signup.component.html',
            styleUrls: ['css/animate.css', 'css/controls.css', 'css/structure.css']
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService])
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map