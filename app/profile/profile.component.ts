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
    styleUrls: ['app/profile/profile.css'],
    providers: [RequestsService]
})

export class ProfileComponent implements OnInit, OnDestroy, AfterContentInit {

    profile: any;
    unassignedServiceRequests: any;
    assignedServiceRequests:any;
    parcelReceivingRequests:any;
    parcelRequests: any;
    parcelGiven = false;
    parcelCollected = false;
    parcelDelivered = false;
    parcelReceived = false;
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

    onReceivingRequestStatusClick(){
        console.log(this.profile);
        this.getParcelReceivingRequests(this.profile);
    }

    onStatusChangeClick(parcelId){
        console.log(parcelId);
        
        this.changeParcelStatus({email: this.profile.email, parcelId: parcelId}, this.getAssignedSenderRequests(this.profile));
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

    // getSecretThing() {
    //     this.authHttp.get('http://localhost:9000/service-request')
    //         .subscribe(
    //             data => {
    //                 console.log(data);
    //                 this.serviceRequests = JSON.stringify(data.json());
    //             },
    //             err => console.log(err),
    //             () => console.log('Complete')
    //         );
    // }

    getAssignedServiceRequests(data){
        if (!this.profile.email) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getAssignedServiceRequests(data)
            .subscribe(
                data  => {
                    this.assignedServiceRequests = data;
                    console.log(this.assignedServiceRequests);
                    console.log(this.parcelRequests);
                    if(this.assignedServiceRequests.length > 0){
                        delete this.parcelRequests;
                        delete this.unassignedServiceRequests;
                        delete this.parcelReceivingRequests;

                        this.showDetails = true;
                        this.requestType = true;
                    }else{
                        delete this.parcelRequests;
                        delete this.unassignedServiceRequests;
                        delete this.parcelReceivingRequests;
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
                    this.unassignedServiceRequests = data;
                    console.log(this.unassignedServiceRequests);
                    console.log(this.parcelRequests);
                    if(this.unassignedServiceRequests.length > 0){
                        delete this.parcelRequests;
                        delete this.assignedServiceRequests;
                        delete this.parcelReceivingRequests;
                        this.showDetails = true;
                        this.requestType = true;
                    }else{
                        delete this.parcelRequests;
                        delete this.assignedServiceRequests;
                        delete this.parcelReceivingRequests;
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
                    console.log(this.parcelRequests);
                    if(this.parcelRequests.length > 0){
                        delete this.unassignedServiceRequests;
                        delete this.assignedServiceRequests;
                        delete this.parcelReceivingRequests;
                        this.showDetails = true;
                        this.requestType = false;
                    }else{
                        delete this.unassignedServiceRequests;
                        delete this.assignedServiceRequests;
                        delete this.parcelReceivingRequests;
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
                    console.log(this.parcelRequests);
                    if(this.parcelRequests.length > 0){
                        delete this.unassignedServiceRequests;
                        delete this.assignedServiceRequests;
                        delete this.parcelReceivingRequests;
                        this.showDetails = true;
                        this.requestType = false;
                    }else{
                        delete this.unassignedServiceRequests;
                        delete this.assignedServiceRequests;
                        delete this.parcelReceivingRequests;
                        this.showDetails = false;
                        this.requestType = false;
                    }
                },
                error =>  this.errorMessage = <any>error
            );

    }


    getParcelReceivingRequests(data){
        if (!this.profile.email) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getParcelReceivingRequests(data)
            .subscribe(
                data  => {
                    this.parcelReceivingRequests = data;
                    console.log(this.parcelRequests);
                    if(this.parcelReceivingRequests.length > 0){
                        delete this.unassignedServiceRequests;
                        delete this.assignedServiceRequests;
                        delete this.parcelRequests;
                        this.showDetails = true;
                    }else{
                        delete this.unassignedServiceRequests;
                        delete this.assignedServiceRequests;
                        delete this.parcelRequests;
                        this.showDetails = false;
                    }
                },
                error =>  this.errorMessage = <any>error
            );

    }
    res: any;
    changeParcelStatus(data, callback){
        if (!data.email || !data.parcelId) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.setParcelStatus(data)
            .subscribe(
                data  => {
                    this.res = data;
                    //noinspection TypeScriptUnresolvedVariable
                    console.log(this.res.status);
                    console.log(this.res.role);
                    //noinspection TypeScriptUnresolvedVariable
                    if(this.res.role === "Sender"){
                        console.log("in sender");
                        this.getAssignedSenderRequests(this.profile);
                    }else { //noinspection TypeScriptUnresolvedVariable
                        if (this.res.role === "Provider"){
                            console.log("in provider");
                            this.getAssignedServiceRequests(this.profile);
                        }else { //noinspection TypeScriptUnresolvedVariable
                            if (this.res.role === "Receiver"){
                                this.getParcelReceivingRequests(this.profile);
                            }
                        }
                    }
                },
                error =>  this.errorMessage = <any>error
            );
    }

    loggedIn() {
        return tokenNotExpired();
    }
}