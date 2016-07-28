/**
 * Created by Abhi on 6/14/16.
 */
import {Component, OnInit, OnDestroy, AfterContentInit, Input} from '@angular/core';
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
    providers: [PaginationService, RequestsService],
    directives: [PaginationControlsCmp, Panel],
    pipes: [PaginatePipe]
})

export class ProfileComponent implements OnInit, OnDestroy, AfterContentInit {

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
    requestType = false


    initMap (){
        this.googleApi.initAutocomplete().then(() => {
            console.log("Hey");
            var markerArray = [];

            // Instantiate a directions service.
            var directionsService = new google.maps.DirectionsService;

            // Create a map and center it on Manhattan.
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: {lat: 40.771, lng: -73.974}
            });

            // Create a renderer for directions and bind it to the map.
            var directionsDisplay = new google.maps.DirectionsRenderer({map: map});

            // Instantiate an info window to hold step text.
            var stepDisplay = new google.maps.InfoWindow;

            // Display the route between the initial start and end selections.
            this.calculateAndDisplayRoute(
                directionsDisplay, directionsService, markerArray, stepDisplay, map);
        });
    }
    
    test () {
        console.log("test");
    }

    calculateAndDisplayRoute(directionsDisplay, directionsService,
                                      markerArray, stepDisplay, map) {
    // First, remove any existing markers from the map.
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }

    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.
    directionsService.route({
        origin: '50 Chumasero Dr, San Francisco, CA, United States',
        destination: '55 Junipero Serra Boulevard, San Francisco, CA, United States',
        travelMode: google.maps.TravelMode.WALKING
    }, (response, status) => {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
           this.showSteps(response, markerArray, stepDisplay, map);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

    showSteps(directionResult, markerArray, stepDisplay, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    var myRoute = directionResult.routes[0].legs[0];
    for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        this.attachInstructionText(
            stepDisplay, marker, myRoute.steps[i].instructions, map);
    }
}

    attachInstructionText(stepDisplay, marker, text, map) {
    google.maps.event.addListener(marker, 'click', function() {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
}


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
    constructor(    private router: Router, private requestsService: RequestsService, private googleApi:GoogleApiService,
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
                        // this.initMap();
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

    loggedIn() {
        return tokenNotExpired();
    }
}