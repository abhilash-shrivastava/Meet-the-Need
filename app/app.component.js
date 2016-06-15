/**
 * Created by Abhi on 6/8/16.
 */
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
var router_deprecated_1 = require('@angular/router-deprecated');
var service_provider_component_1 = require("./service-provider/service-provider.component");
var parcel_sender_component_1 = require("./parcel-sender/parcel-sender.component");
var profile_component_1 = require("./profile/profile.component");
var angular2_jwt_1 = require('angular2-jwt');
var user_crud_service_1 = require('./services/user-crud.service');
require('./rxjs-operators');
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent(userCRUDService) {
        this.userCRUDService = userCRUDService;
        this.title = 'Meet The Need';
        this.mode = 'Observable';
        this.lock = new Auth0Lock('0CKZr9nRkW4Yp8XSlFbJhkqzJOEBLzsf', 'abhilashshrivastava.auth0.com');
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
    }
    AppComponent.prototype.logout = function () {
        var self = this;
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        self.loggedIn();
    };
    AppComponent.prototype.signin = function () {
        var self = this;
        this.lock.showSignin(function (err, profile, id_token) {
            if (err) {
                throw new Error(err);
            }
            console.log(profile);
            console.log(id_token);
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
        });
        self.loggedIn();
    };
    AppComponent.prototype.signup = function () {
        var _this = this;
        var self = this;
        this.lock.showSignup(function (err, profile, id_token) {
            if (err) {
                throw new Error(err);
            }
            console.log(profile);
            console.log(id_token);
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
            _this.saveUserDetails(profile);
        });
        self.loggedIn();
    };
    AppComponent.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    AppComponent.prototype.saveUserDetails = function (userDetails) {
        var _this = this;
        if (!userDetails) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.userCRUDService.save(userDetails)
            .subscribe(function (data) { return _this.status = JSON.stringify(data); }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n                <h1>{{title}}</h1>\n                <nav>\n                <a *ngIf=\"loggedIn()\" [routerLink]=\"['ServiceProvider']\">Service Provider</a>&nbsp;\n                <a *ngIf=\"loggedIn()\" [routerLink]=\"['ParcelSender']\">Parcel Sender</a>&nbsp;\n                <a *ngIf=\"loggedIn()\" [routerLink]=\"['Profile']\">Profile</a>&nbsp;\n                <a *ngIf=\"!loggedIn()\" (click)=\"signin()\">Sign In</a>\n                <a *ngIf=\"!loggedIn()\" (click)=\"signup()\">Sign Up</a>\n                <a *ngIf=\"loggedIn()\" (click)=\"logout()\">Logout</a>\n                </nav>\n                <router-outlet></router-outlet>        ",
            styleUrls: ['app/app.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                user_crud_service_1.UserCRUDService
            ]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/profile',
                name: 'Profile',
                component: profile_component_1.ProfileComponent
            },
            {
                path: '/service-provider',
                name: 'ServiceProvider',
                component: service_provider_component_1.ServiceProviderComponent
            },
            {
                path: '/parcel-sender',
                name: 'ParcelSender',
                component: parcel_sender_component_1.ParcelSenderComponent
            }
        ]), 
        __metadata('design:paramtypes', [user_crud_service_1.UserCRUDService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map