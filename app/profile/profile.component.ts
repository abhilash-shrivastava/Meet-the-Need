/**
 * Created by Abhi on 6/14/16.
 */
import {Component, OnInit, OnDestroy, AfterContentInit} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import {AuthHttp} from 'angular2-jwt';


@Component({
    selector: 'profile',
    template: `
	 <img src="{{profile.picture}}" style="width: 50px" /> {{profile.name}}
	 <h2>Message from server</h2>
   {{message}}
	`
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
                    console.log(data.json());
                    this.message = data.json();
                },
                err => console.log(err),
                () => console.log('Complete')
            );
    }
}