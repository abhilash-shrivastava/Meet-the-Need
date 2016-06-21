/**
 * Created by Abhi on 6/14/16.
 */
import {Component, OnInit, OnDestroy, AfterContentInit} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {tokenNotExpired} from 'angular2-jwt';


@Component({
    selector: 'profile',
    templateUrl: 'app/profile/profile.html'
})

export class ProfileComponent implements OnInit, OnDestroy, AfterContentInit {

    profile: any;
    message: any;

    constructor(public authHttp: AuthHttp) {
    }

    ngOnInit(): void {
        console.log('ngOnInit() called');
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.getSecretThing();
    }

    ngOnDestroy() : void {
        console.log('ngOnDestroy() called');
    }

    ngAfterContentInit() {
        console.log('ngAfterContentInit() called');
    }

    getSecretThing() {
        this.authHttp.get('http://localhost:9000/user-profile')
            .subscribe(
                data => {
                    console.log(data);
                    this.message = JSON.stringify(data.json());
                },
                err => console.log(err),
                () => console.log('Complete')
            );
    }

    loggedIn() {
        return tokenNotExpired();
    }
}