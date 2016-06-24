/**
 * Created by Abhi on 6/14/16.
 */
import {Component, OnInit, OnDestroy, AfterContentInit, Input} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {tokenNotExpired} from 'angular2-jwt';
import { RequestsService } from './../services/request.service';




@Component({
    selector: 'profile',
    templateUrl: 'app/profile/profile.html',
    providers: [RequestsService]
})

export class ProfileComponent implements OnInit, OnDestroy, AfterContentInit {

    profile: any;
    serviceRequests: any;
    parcelRequests: any;
    errorMessage: string;
    public arrayOfKeys;
    showDetails = false;
    requestType = false

    onAssignedServiceClick(){
        console.log(this.profile);
        this.getAssignedServiceRequests(this.profile);
    }

    onUnassignedServiceClick(){
        console.log(this.profile);
        this.getUnassignedServiceRequests(this.profile);
    }

    onAssignedSenderClick(){
        console.log(this.profile);
        this.getAssignedSenderRequests(this.profile);
    }

    onUnassignedSenderClick(){
        console.log(this.profile);
        this.getUnassignedSenderRequests(this.profile);
    }

    constructor(    private requestsService: RequestsService,
                    public authHttp: AuthHttp) {
    }

    ngOnInit(): void {
        console.log('ngOnInit() called');
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }

    ngOnDestroy() : void {
        console.log('ngOnDestroy() called');
    }

    ngAfterContentInit() {
        console.log('ngAfterContentInit() called');
    }

    getSecretThing() {
        this.authHttp.get('http://localhost:9000/service-request')
            .subscribe(
                data => {
                    console.log(data);
                    this.serviceRequests = JSON.stringify(data.json());
                },
                err => console.log(err),
                () => console.log('Complete')
            );
    }

    getAssignedServiceRequests(data){
        if (!this.profile.email) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getAssignedServiceRequests(data)
            .subscribe(
                data  => {
                    this.serviceRequests = data;
                    console.log(this.serviceRequests);
                    console.log(this.parcelRequests);
                    if(this.serviceRequests.length > 0){
                        delete this.parcelRequests;
                        this.showDetails = true;
                        this.requestType = true;
                    }else{
                        delete this.parcelRequests;
                        this.showDetails = false;
                        this.requestType = true;
                    }
                },
                        error =>  this.errorMessage = <any>error
            );

    }

    getUnassignedServiceRequests(data){
        if (!this.profile.email) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getUnassignedServiceRequests(data)
            .subscribe(
                data  => {
                    this.serviceRequests = data;
                    console.log(this.serviceRequests);
                    console.log(this.parcelRequests);
                    if(this.serviceRequests.length > 0){
                        delete this.parcelRequests;
                        this.showDetails = true;
                        this.requestType = true;
                    }else{
                        delete this.parcelRequests;
                        this.showDetails = false;
                        this.requestType = true;
                    }
                },
                error =>  this.errorMessage = <any>error
            );

    }

    getAssignedSenderRequests(data){
        if (!this.profile.email) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getAssignedSenderRequests(data)
            .subscribe(
                data  => {
                    this.parcelRequests = data;
                    console.log(this.serviceRequests);
                    console.log(this.parcelRequests);
                    if(this.parcelRequests.length > 0){
                        delete this.serviceRequests;
                        this.showDetails = true;
                        this.requestType = false;
                    }else{
                        delete this.serviceRequests;
                        this.showDetails = false;
                        this.requestType = false;
                    }
                },
                error =>  this.errorMessage = <any>error
            );

    }

    getUnassignedSenderRequests(data){
        if (!this.profile.email) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getUnassignedSenderRequests(data)
            .subscribe(
                data  => {
                    this.parcelRequests = data;
                    console.log(this.serviceRequests);
                    console.log(this.parcelRequests);
                    if(this.parcelRequests.length > 0){
                        this.showDetails = true;
                        this.requestType = false;
                    }else{
                        this.showDetails = false;
                        this.requestType = false;
                    }
                },
                error =>  this.errorMessage = <any>error
            );

    }


    loggedIn() {
        return tokenNotExpired();
    }
}