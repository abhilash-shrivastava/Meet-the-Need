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
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Meet The Need';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n                <h1>{{title}}</h1>\n                <nav>\n                <a [routerLink]=\"['ServiceProvider']\">Service Provider</a>\n                <a [routerLink]=\"['ParcelSender']\">Parcel Sender</a>\n                </nav>\n                <router-outlet></router-outlet>        ",
            styleUrls: ['app/app.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS
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