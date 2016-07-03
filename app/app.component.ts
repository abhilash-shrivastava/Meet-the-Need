/**
 * Created by Abhi on 6/8/16.
 */

import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from '@angular/router-deprecated';
import {ServiceProviderComponent} from "./service-provider/service-provider.component";
import {ParcelSenderComponent} from "./parcel-sender/parcel-sender.component";
import {ProfileComponent} from "./profile/profile.component";
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import { UserCRUDService } from './services/user-crud.service';
import {UserDetails} from "./services/user";
import './rxjs-operators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


declare var Auth0Lock;

@Component({
    selector: 'my-app',
    templateUrl:'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        UserCRUDService
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

    profile:any
    title = 'Meet The Need';
    errorMessage: string;
    status: string;
    mode = 'Observable';
    constructor(private userCRUDService: UserCRUDService, private router: Router) {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    lock = new Auth0Lock('0CKZr9nRkW4Yp8XSlFbJhkqzJOEBLzsf', 'abhilashshrivastava.auth0.com');
    jwtHelper = new JwtHelper();

    logout() {
        var self = this;
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        sessionStorage.clear();
        window.location.reload();
        self.loggedIn();
    }

    signin() {
        var self = this;
        this.lock.showSignin((err: string, profile: string, id_token: string) => {
            if (err){
                throw new Error(err);
            }
            console.log(profile);
            console.log(id_token);
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
            this.profile = JSON.stringify(profile);
            window.location.reload();
            self.loggedIn();
        });

    }

    signup(){
        var self = this;
        this.lock.showSignup((err: string, profile: UserDetails, id_token: string) => {
            if (err){
                throw new Error(err);
            }
            console.log(profile);
            console.log(id_token);
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
            this.profile = JSON.stringify(profile);
            this.saveUserDetails(profile);
            window.location.reload();
            self.loggedIn();

        })
    }

    resetPassword() {
        var self = this;
        this.lock.showReset((err: string, profile: string, id_token: string) => {
            if (err) {
                throw new Error(err);
            }
            self.loggedIn();
        });
    }
    loggedIn() {
        return tokenNotExpired();
    }

    saveUserDetails(userDetails: UserDetails){
        if (!userDetails) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.userCRUDService.save(userDetails)
            .subscribe(
                data  => this.status = JSON.stringify(data),
                error =>  this.errorMessage = <any>error
            );

    }
    
    

}
