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
        this.getAssignedServiceRequests(this.profile);
    }

    onUnassignedServiceClick(){
        this.getUnassignedServiceRequests(this.profile);
    }

    onAssignedSenderClick(){
        this.getAssignedSenderRequests(this.profile);
    }

    onUnassignedSenderClick(){
        this.getUnassignedSenderRequests(this.profile);
    }

    onReceivingRequestStatusClick(){
        this.getParcelReceivingRequests(this.profile);
    }

    onStatusChangeClick(parcelId){
        this.changeParcelStatus({email: this.profile.email, parcelId: parcelId}, this.getAssignedSenderRequests(this.profile));
    }

    onCancelClick(requestId, requestType){
        
        if (requestType == 'Service'){
            this.cancelRequest({requestId: requestId, requestType: requestType}, this.onUnassignedServiceClick())
        }
        if (requestType == 'Parcel'){
            this.cancelRequest({requestId: requestId, requestType: requestType}, this.onUnassignedSenderClick())
        }
    }

    onUpdateClick(requestId, requestType){
        // if (requestType == 'Service'){
        //     this.updateRequest({requestId: requestId, requestType: requestType}, this.onUnassignedServiceClick())
        // }
        // if (requestType == 'Parcel'){
        //     this.updateRequest({requestId: requestId, requestType: requestType}, this.onUnassignedSenderClick())
        // }
    }
    constructor(    private requestsService: RequestsService,
                    public authHttp: AuthHttp) {
    }

    ngOnInit(): void {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }

    ngOnDestroy() : void {
    }

    ngAfterContentInit() {
    }

    getAssignedServiceRequests(data){
        if (!this.profile.email) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getAssignedServiceRequests(data)
            .subscribe(
                data  => {
                    this.assignedServiceRequests = data;
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
                    //noinspection TypeScriptUnresolvedVariable
                    if(this.res.role === "Sender"){
                        this.getAssignedSenderRequests(this.profile);
                    }else { //noinspection TypeScriptUnresolvedVariable
                        if (this.res.role === "Provider"){
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

    cancelRequest(data, callback){
        if (!data.requestId || !data.requestType) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.cancelRequest(data)
            .subscribe(
                data  => {
                    this.res = data;
                    if (this.res.role == 'Service'){
                        this.onUnassignedServiceClick();
                    }
                    if (this.res.role == 'Parcel'){
                        this.onUnassignedSenderClick();
                    }
                },
                error =>  this.errorMessage = <any>error
            );
    }

    updateRequest(data, callback){
        if (!data.requestId || !data.requestType) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.updateRequest(data)
            .subscribe(
                data  => {
                    this.res = data;
                    if (this.res[0].email){
                        console.log("go to service");
                        window.location.href = 'localhost:3000/service-provider'
                    }else {
                        console.log("go to parcel");
                        window.location.href = 'localhost:3000/parcel-sender'
                    }
                },
                error =>  this.errorMessage = <any>error
            );
    }

    loggedIn() {
        return tokenNotExpired();
    }
}