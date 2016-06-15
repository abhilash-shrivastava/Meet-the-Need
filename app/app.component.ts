/**
 * Created by Abhi on 6/8/16.
 */

import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {ServiceProviderComponent} from "./service-provider/service-provider.component";
import {ParcelSenderComponent} from "./parcel-sender/parcel-sender.component";
import {ProfileComponent} from "./profile/profile.component";
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';

declare var Auth0Lock;

@Component({
    selector: 'my-app',
    template: `
                <h1>{{title}}</h1>
                <nav>
                <a *ngIf="loggedIn()" [routerLink]="['ServiceProvider']">Service Provider</a>&nbsp;
                <a *ngIf="loggedIn()" [routerLink]="['ParcelSender']">Parcel Sender</a>&nbsp;
                <a *ngIf="loggedIn()" [routerLink]="['Profile']">Profile</a>&nbsp;
                <a *ngIf="!loggedIn()" (click)="login()">Login</a>
                <a *ngIf="loggedIn()" (click)="logout()">Logout</a>
                </nav>
                <router-outlet></router-outlet>        `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS
    ]

})
//noinspection TypeScriptValidateTypes
@RouteConfig([
    {
        path: '/profile',
        name: 'Profile',
        component: ProfileComponent
    },
    {
        path: '/service-provider',
        name: 'ServiceProvider',
        component: ServiceProviderComponent
    },
    {
        path: '/parcel-sender',
        name: 'ParcelSender',
        component: ParcelSenderComponent
    }
])

export class AppComponent {

    title = 'Meet The Need';
    lock = new Auth0Lock('0CKZr9nRkW4Yp8XSlFbJhkqzJOEBLzsf', 'abhilashshrivastava.auth0.com');
    jwtHelper = new JwtHelper();

    logout() {

        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.loggedIn();
    }

    login() {

        this.lock.show((err: string, profile: string, id_token: string) => {
            if (err){
                throw new Error(err);
            }

            console.log(profile);
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);

            // console.log(
            //     this.jwtHelper.decodeToken(id_token),
            //     this.jwtHelper.getTokenExpirationDate(id_token),
            //     this.jwtHelper.isTokenExpired(id_token)
            // );
            this.loggedIn();
        })
    }
    loggedIn() {
        return tokenNotExpired();
    }
}
