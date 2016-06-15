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
/**
 * Created by Abhi on 6/14/16.
 */
var core_1 = require('@angular/core');
var angular2_jwt_1 = require('angular2-jwt');
var angular2_jwt_2 = require('angular2-jwt');
var ProfileComponent = (function () {
    function ProfileComponent(authHttp) {
        this.authHttp = authHttp;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        console.log('ngOnInit() called');
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.getSecretThing();
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        console.log('ngOnDestroy() called');
    };
    ProfileComponent.prototype.ngAfterContentInit = function () {
        console.log('ngAfterContentInit() called');
    };
    ProfileComponent.prototype.getSecretThing = function () {
        var _this = this;
        this.authHttp.get('http://localhost:9000/user-profile')
            .subscribe(function (data) {
            console.log(data.json());
            _this.message = data.json();
        }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
    };
    ProfileComponent.prototype.loggedIn = function () {
        return angular2_jwt_2.tokenNotExpired();
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            template: "\n    <div *ngIf=\"loggedIn()\">\n    <img src=\"{{profile.picture}}\" style=\"width: 50px\" /> {{profile.name}}\n\t <h2>Message from server</h2>\n   {{message}}\n    </div>\n\t"
        }), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map