/**
 * Created by Abhi on 6/14/16.
 */
import {Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild, ElementRef, Renderer} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {tokenNotExpired} from 'angular2-jwt';
import { RequestsService } from './../services/request.service';
import { RouteParams, Router } from '@angular/router-deprecated';
import {PaginationControlsCmp, PaginatePipe, PaginationService} from 'ng2-pagination';
import {GoogleApiService} from "../services/googleAPIService.service";
import {Panel} from './panel';




@Component({
    selector: 'profile',
    templateUrl: 'app/profile/profile.html',
    styleUrls: ['app/profile/profile.css'],
    providers: [PaginationService, RequestsService, Panel],
    directives: [PaginationControlsCmp, Panel],
    pipes: [PaginatePipe]
})

export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {

    title: string = 'test title';
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
    requestType = false;
    id: any;
    mapAddress:any;
    currentServiceAddress: any;
    currentSenderAddress:any;
    deliveryAddress:any;
    destinationAddress:any;
    status:any;

    mapLoadAssignedService(id:any, currentSenderAddress: any, currentServiceAddress:any, deliveryAddress:any, destinationAddress:any, status:any){

        this.currentServiceAddress = currentServiceAddress;
        this.currentSenderAddress = currentSenderAddress;
        this.deliveryAddress = deliveryAddress;
        this.destinationAddress = destinationAddress;
        
        this.status = status;
        if (this.id !== id && status == 'Assigned To Service Provider'){
            this.id = id;
            this.panel.initMap(this.id, this.currentServiceAddress, this.currentSenderAddress);
            this.mapAddress = "Map Direction To Parcel Sender";
        }
        if (this.id !== id && (status == 'Parcel Given To Service Provider' || status =='Parcel Collected From Sender' || status =='Parcel Delivered To Receiver' || status =='Parcel Received From Service Provider')){
            this.id = id;
            this.panel.initMap(this.id, this.destinationAddress, this.deliveryAddress);
            this.mapAddress = "Map Direction To Receiver"
        }
    }

    mapLoadAssignedParcel(id:any, currentSenderAddress: any, currentServiceAddress:any, deliveryAddress:any, destinationAddress:any, status:any){

        this.currentServiceAddress = currentServiceAddress;
        this.currentSenderAddress = currentSenderAddress;
        this.deliveryAddress = deliveryAddress;
        this.destinationAddress = destinationAddress;


        if (this.id !== id && status == 'Assigned To Service Provider'){
            this.id = id;
            this.panel.initMap(this.id, this.currentSenderAddress, this.currentServiceAddress);
            this.mapAddress = "Map Direction To Service Provider";
        }
        if (this.id !== id && (status == 'Parcel Given To Service Provider' || status =='Parcel Collected From Sender' || status =='Parcel Delivered To Receiver' || status =='Parcel Received From Service Provider')){
            this.id = id;
            this.panel.initMap(this.id, this.deliveryAddress, this.destinationAddress);
            this.mapAddress = "Map Direction Between Service Provider and Receiver";
        }
    }

    mapLoadAssignedReceiver(id:any, currentSenderAddress: any, currentServiceAddress:any, deliveryAddress:any, destinationAddress:any, status:any){

        this.currentServiceAddress = currentServiceAddress;
        this.currentSenderAddress = currentSenderAddress;
        this.deliveryAddress = deliveryAddress;
        this.destinationAddress = destinationAddress;

        if (this.id !== id && status == 'Assigned To Service Provider'){
            this.id = id;
            this.panel.initMap(this.id, this.currentSenderAddress, this.currentServiceAddress);
            this.mapAddress = "Map Direction Between Service Provider and Parcel Sender";
        }
        if (this.id !== id && (status == 'Parcel Given To Service Provider' || status =='Parcel Collected From Sender' || status =='Parcel Delivered To Receiver' || status =='Parcel Received From Service Provider')){
            this.id = id;
            this.panel.initMap(this.id, this.deliveryAddress, this.destinationAddress);
            this.mapAddress = "Map Direction To Service Provider";
        }
    }

    onAssignedServiceClick(){
        this.id = null;
        this.getAssignedServiceRequests(this.profile);
    }

    onUnassignedServiceClick(){
        this.getUnassignedServiceRequests(this.profile);
    }

    onAssignedSenderClick(){
        this.id = null;
        this.getAssignedSenderRequests(this.profile);
    }

    onUnassignedSenderClick(){
        this.getUnassignedSenderRequests(this.profile);
    }

    onReceivingRequestStatusClick(){
        this.id = null;
        this.getParcelReceivingRequests(this.profile);
    }

    onStatusChangeClick(parcelId){
        this.changeParcelStatus({email: this.profile.email, parcelId: parcelId}, this.getAssignedSenderRequests(this.profile));
    }

    onCancelClick(requestId, requestType){
        if (confirm("Cancel Request?")){
            if (requestType == 'Service'){
                this.cancelRequest({requestId: requestId, requestType: requestType}, this.onUnassignedServiceClick())
            }
            if (requestType == 'Parcel'){
                this.cancelRequest({requestId: requestId, requestType: requestType}, this.onUnassignedSenderClick())
            }
        }
    }

    onUpdateClick(requestId, requestType){
        if (requestType == 'Service'){
            this.router.navigate( ['ServiceProvider', {id: requestId}] );
        }
        if (requestType == 'Parcel'){
            this.router.navigate( ['ParcelSender', {id: requestId}] );
        }
    }
    constructor(    private router: Router, private requestsService: RequestsService,
                    private panel: Panel,
                    private renderer: Renderer,
                    public authHttp: AuthHttp) {
    }

    ngOnInit(): void {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }

    ngOnDestroy() : void {
    }

    ngAfterViewInit() {
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
                        // callback;
                    }else{
                        delete this.parcelRequests;
                        delete this.unassignedServiceRequests;
                        delete this.parcelReceivingRequests;
                        this.showDetails = false;
                        this.requestType = true;
                    }
                    this.id = null;
                    this.mapLoadAssignedService(this.id, this.currentServiceAddress, this.currentSenderAddress, this.deliveryAddress, this.destinationAddress, this.status);
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
                    this.id = null;
                    this.mapLoadAssignedParcel(this.id, this.currentServiceAddress, this.currentSenderAddress, this.deliveryAddress, this.destinationAddress, this.status);

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
                    this.id = null;
                    this.mapLoadAssignedReceiver(this.id, this.currentServiceAddress, this.currentSenderAddress, this.deliveryAddress, this.destinationAddress, this.status);

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
                    this.id = null;
                    this.res = data;
                    console.log("changed");
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

    loggedIn() {
        return tokenNotExpired();
    }
}