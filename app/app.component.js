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
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var service_provider_component_1 = require("./service-provider/service-provider.component");
var parcel_sender_component_1 = require("./parcel-sender/parcel-sender.component");
var service_provider_crud_service_1 = require('./services/service-provider-crud.service');
var angular2_jwt_1 = require('angular2-jwt');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Meet The Need';
        this.lock = new Auth0Lock('0CKZr9nRkW4Yp8XSlFbJhkqzJOEBLzsf', 'abhilashshrivastava.auth0.com');
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
    }
    AppComponent.prototype.logout = function () {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.loggedIn();
    };
    AppComponent.prototype.login = function () {
        var _this = this;
        this.lock.show(function (err, profile, id_token) {
            if (err) {
                throw new Error(err);
            }
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
            console.log(_this.jwtHelper.decodeToken(id_token), _this.jwtHelper.getTokenExpirationDate(id_token), _this.jwtHelper.isTokenExpired(id_token));
            _this.loggedIn();
        });
    };
    AppComponent.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n                <h1>{{title}}</h1>\n                <nav>\n                <a [routerLink]=\"['ServiceProvider']\">Service Provider</a>\n                <a [routerLink]=\"['ParcelSender']\">Parcel Sender</a>\n                <button *ngIf=\"!loggedIn()\" (click)=\"login()\">Login</button>\n                <button *ngIf=\"loggedIn()\" (click)=\"logout()\">Logout</button>\n                </nav>\n                <router-outlet></router-outlet>        ",
            styleUrls: ['app/app.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                service_provider_crud_service_1.ServiceProviderCRUDService
            ]
        }),
        router_deprecated_1.RouteConfig([
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
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map