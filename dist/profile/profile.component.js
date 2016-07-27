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
/**
 * Created by Abhi on 6/14/16.
 */
var core_1 = require('@angular/core');
var angular2_jwt_1 = require('angular2-jwt');
var angular2_jwt_2 = require('angular2-jwt');
var request_service_1 = require('./../services/request.service');
var router_deprecated_1 = require('@angular/router-deprecated');
var ng2_pagination_1 = require('ng2-pagination');
var googleAPIService_service_1 = require("../services/googleAPIService.service");
var ProfileComponent = (function () {
    function ProfileComponent(router, requestsService, googleApi, authHttp) {
        this.router = router;
        this.requestsService = requestsService;
        this.googleApi = googleApi;
        this.authHttp = authHttp;
        this.parcelGiven = false;
        this.parcelCollected = false;
        this.parcelDelivered = false;
        this.parcelReceived = false;
        this.showDetails = false;
        this.requestType = false;
    }
    ProfileComponent.prototype.initMap = function () {
        var _this = this;
        this.googleApi.initAutocomplete().then(function () {
            console.log("Hey");
            var markerArray = [];
            // Instantiate a directions service.
            var directionsService = new google.maps.DirectionsService;
            // Create a map and center it on Manhattan.
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: { lat: 40.771, lng: -73.974 }
            });
            // Create a renderer for directions and bind it to the map.
            var directionsDisplay = new google.maps.DirectionsRenderer({ map: map });
            // Instantiate an info window to hold step text.
            var stepDisplay = new google.maps.InfoWindow;
            // Display the route between the initial start and end selections.
            _this.calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);
        });
    };
    ProfileComponent.prototype.test = function () {
        console.log("test");
    };
    ProfileComponent.prototype.calculateAndDisplayRoute = function (directionsDisplay, directionsService, markerArray, stepDisplay, map) {
        var _this = this;
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
        }, function (response, status) {
            // Route the directions and pass the response to a function to create
            // markers for each step.
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                _this.showSteps(response, markerArray, stepDisplay, map);
            }
            else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };
    ProfileComponent.prototype.showSteps = function (directionResult, markerArray, stepDisplay, map) {
        // For each step, place a marker, and add the text to the marker's infowindow.
        // Also attach the marker to an array so we can keep track of it and remove it
        // when calculating new routes.
        var myRoute = directionResult.routes[0].legs[0];
        for (var i = 0; i < myRoute.steps.length; i++) {
            var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
            marker.setMap(map);
            marker.setPosition(myRoute.steps[i].start_location);
            this.attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
        }
    };
    ProfileComponent.prototype.attachInstructionText = function (stepDisplay, marker, text, map) {
        google.maps.event.addListener(marker, 'click', function () {
            // Open an info window when the marker is clicked on, containing the text
            // of the step.
            stepDisplay.setContent(text);
            stepDisplay.open(map, marker);
        });
    };
    ProfileComponent.prototype.onAssignedServiceClick = function () {
        this.getAssignedServiceRequests(this.profile);
    };
    ProfileComponent.prototype.onUnassignedServiceClick = function () {
        this.getUnassignedServiceRequests(this.profile);
    };
    ProfileComponent.prototype.onAssignedSenderClick = function () {
        this.getAssignedSenderRequests(this.profile);
    };
    ProfileComponent.prototype.onUnassignedSenderClick = function () {
        this.getUnassignedSenderRequests(this.profile);
    };
    ProfileComponent.prototype.onReceivingRequestStatusClick = function () {
        this.getParcelReceivingRequests(this.profile);
    };
    ProfileComponent.prototype.onStatusChangeClick = function (parcelId) {
        this.changeParcelStatus({ email: this.profile.email, parcelId: parcelId }, this.getAssignedSenderRequests(this.profile));
    };
    ProfileComponent.prototype.onCancelClick = function (requestId, requestType) {
        if (confirm("Cancel Request?")) {
            if (requestType == 'Service') {
                this.cancelRequest({ requestId: requestId, requestType: requestType }, this.onUnassignedServiceClick());
            }
            if (requestType == 'Parcel') {
                this.cancelRequest({ requestId: requestId, requestType: requestType }, this.onUnassignedSenderClick());
            }
        }
    };
    ProfileComponent.prototype.onUpdateClick = function (requestId, requestType) {
        if (requestType == 'Service') {
            this.router.navigate(['ServiceProvider', { id: requestId }]);
        }
        if (requestType == 'Parcel') {
            this.router.navigate(['ParcelSender', { id: requestId }]);
        }
    };
    ProfileComponent.prototype.ngOnInit = function () {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
    };
    ProfileComponent.prototype.ngAfterContentInit = function () {
    };
    ProfileComponent.prototype.getAssignedServiceRequests = function (data) {
        var _this = this;
        if (!this.profile.email) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getAssignedServiceRequests(data)
            .subscribe(function (data) {
            _this.assignedServiceRequests = data;
            if (_this.assignedServiceRequests.length > 0) {
                delete _this.parcelRequests;
                delete _this.unassignedServiceRequests;
                delete _this.parcelReceivingRequests;
                _this.showDetails = true;
                _this.requestType = true;
            }
            else {
                delete _this.parcelRequests;
                delete _this.unassignedServiceRequests;
                delete _this.parcelReceivingRequests;
                _this.showDetails = false;
                _this.requestType = true;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    ProfileComponent.prototype.getUnassignedServiceRequests = function (data) {
        var _this = this;
        if (!this.profile.email) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getUnassignedServiceRequests(data)
            .subscribe(function (data) {
            _this.unassignedServiceRequests = data;
            if (_this.unassignedServiceRequests.length > 0) {
                delete _this.parcelRequests;
                delete _this.assignedServiceRequests;
                delete _this.parcelReceivingRequests;
                _this.showDetails = true;
                _this.requestType = true;
            }
            else {
                delete _this.parcelRequests;
                delete _this.assignedServiceRequests;
                delete _this.parcelReceivingRequests;
                _this.showDetails = false;
                _this.requestType = true;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    ProfileComponent.prototype.getAssignedSenderRequests = function (data) {
        var _this = this;
        if (!this.profile.email) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getAssignedSenderRequests(data)
            .subscribe(function (data) {
            _this.parcelRequests = data;
            if (_this.parcelRequests.length > 0) {
                delete _this.unassignedServiceRequests;
                delete _this.assignedServiceRequests;
                delete _this.parcelReceivingRequests;
                _this.showDetails = true;
                _this.requestType = false;
                _this.initMap();
            }
            else {
                delete _this.unassignedServiceRequests;
                delete _this.assignedServiceRequests;
                delete _this.parcelReceivingRequests;
                _this.showDetails = false;
                _this.requestType = false;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    ProfileComponent.prototype.getUnassignedSenderRequests = function (data) {
        var _this = this;
        if (!this.profile.email) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getUnassignedSenderRequests(data)
            .subscribe(function (data) {
            _this.parcelRequests = data;
            if (_this.parcelRequests.length > 0) {
                delete _this.unassignedServiceRequests;
                delete _this.assignedServiceRequests;
                delete _this.parcelReceivingRequests;
                _this.showDetails = true;
                _this.requestType = false;
            }
            else {
                delete _this.unassignedServiceRequests;
                delete _this.assignedServiceRequests;
                delete _this.parcelReceivingRequests;
                _this.showDetails = false;
                _this.requestType = false;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    ProfileComponent.prototype.getParcelReceivingRequests = function (data) {
        var _this = this;
        if (!this.profile.email) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getParcelReceivingRequests(data)
            .subscribe(function (data) {
            _this.parcelReceivingRequests = data;
            if (_this.parcelReceivingRequests.length > 0) {
                delete _this.unassignedServiceRequests;
                delete _this.assignedServiceRequests;
                delete _this.parcelRequests;
                _this.showDetails = true;
            }
            else {
                delete _this.unassignedServiceRequests;
                delete _this.assignedServiceRequests;
                delete _this.parcelRequests;
                _this.showDetails = false;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    ProfileComponent.prototype.changeParcelStatus = function (data, callback) {
        var _this = this;
        if (!data.email || !data.parcelId) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.setParcelStatus(data)
            .subscribe(function (data) {
            _this.res = data;
            //noinspection TypeScriptUnresolvedVariable
            //noinspection TypeScriptUnresolvedVariable
            if (_this.res.role === "Sender") {
                _this.getAssignedSenderRequests(_this.profile);
            }
            else {
                if (_this.res.role === "Provider") {
                    _this.getAssignedServiceRequests(_this.profile);
                }
                else {
                    if (_this.res.role === "Receiver") {
                        _this.getParcelReceivingRequests(_this.profile);
                    }
                }
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    ProfileComponent.prototype.cancelRequest = function (data, callback) {
        var _this = this;
        if (!data.requestId || !data.requestType) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.cancelRequest(data)
            .subscribe(function (data) {
            _this.res = data;
            if (_this.res.role == 'Service') {
                _this.onUnassignedServiceClick();
            }
            if (_this.res.role == 'Parcel') {
                _this.onUnassignedSenderClick();
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    ProfileComponent.prototype.loggedIn = function () {
        return angular2_jwt_2.tokenNotExpired();
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            templateUrl: 'app/profile/profile.html',
            styleUrls: ['app/profile/profile.css'],
            providers: [ng2_pagination_1.PaginationService, request_service_1.RequestsService],
            directives: [ng2_pagination_1.PaginationControlsCmp],
            pipes: [ng2_pagination_1.PaginatePipe]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, request_service_1.RequestsService, googleAPIService_service_1.GoogleApiService, angular2_jwt_1.AuthHttp])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map