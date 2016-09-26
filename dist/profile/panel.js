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
 * Created by Abhi on 7/28/16.
 */
var core_1 = require('@angular/core');
var map_directive_1 = require('./map.directive');
var googleAPIService_service_1 = require("../services/googleAPIService.service");
var Panel = (function () {
    function Panel(googleApi) {
        this.googleApi = googleApi;
        this.opened = false;
    }
    Panel.prototype.toggle = function () {
        this.opened = !this.opened;
    };
    Panel.prototype.initMap = function (id, address1, address2) {
        var _this = this;
        this.googleApi.initAutocomplete().then(function () {
            _this.callMap(id, address1, address2);
        });
    };
    Panel.prototype.callMap = function (id, address1, address2) {
        this.markerArray = [];
        // Instantiate a directions service.
        this.directionsService = new google.maps.DirectionsService;
        this.geocoder = new google.maps.Geocoder();
        // Create a map and center it on Manhattan.
        this.map = new google.maps.Map(document.getElementById(id), {
            zoom: 13,
            center: { lat: 40.771, lng: -73.974 }
        });
        // Create a renderer for directions and bind it to the map.
        this.directionsDisplay = new google.maps.DirectionsRenderer({ map: this.map });
        // Instantiate an info window to hold step text.
        this.stepDisplay = new google.maps.InfoWindow;
        // Display the route between the initial start and end selections.
        this.calculateAndDisplayRoute(this.directionsDisplay, this.directionsService, this.markerArray, this.stepDisplay, this.map, address1, address2);
    };
    Panel.prototype.getDistanceAndDuration = function (origin, destination, callback) {
        this.service = new google.maps.DistanceMatrixService;
        var distanceAndDuration = {};
        this.service.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {
            if (status !== 'OK') {
                alert('Error was: ' + status);
            }
            else {
                var results = response.rows[0].elements;
                distanceAndDuration["distance"] = results[0].distance.text;
                distanceAndDuration["duration"] = results[0].duration.text;
                //noinspection TypeScriptUnresolvedVariable
                callback(distanceAndDuration);
            }
        });
    };
    Panel.prototype.codeAddress = function (address) {
        var coordinates = {};
        this.geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == 'OK') {
                coordinates["lat"] = results[0].geometry.location.lat();
                coordinates["lng"] = results[0].geometry.location.lng();
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
        console.log(coordinates);
        return coordinates;
    };
    Panel.prototype.calculateAndDisplayRoute = function (directionsDisplay, directionsService, markerArray, stepDisplay, map, address1, address2) {
        var _this = this;
        // First, remove any existing markers from the map.
        for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }
        // Retrieve the start and end locations and create a DirectionsRequest using
        // WALKING directions.
        directionsService.route({
            origin: address1,
            destination: address2,
            travelMode: google.maps.TravelMode.DRIVING,
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
    Panel.prototype.showSteps = function (directionResult, markerArray, stepDisplay, map) {
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
    Panel.prototype.attachInstructionText = function (stepDisplay, marker, text, map) {
        google.maps.event.addListener(marker, 'click', function () {
            // Open an info window when the marker is clicked on, containing the text
            // of the step.
            stepDisplay.setContent(text);
            stepDisplay.open(map, marker);
        });
    };
    Panel = __decorate([
        core_1.Component({
            selector: 'panel',
            styles: ["\n    .hide {\n      display: none;\n    },\n    .list-title {\n    background: #0273D4;\n    color: white;\n    }\n    "
            ],
            template: "\n  <div class=\"card\" *ngIf=\"title\">\n    <div style=\"background: #0273D4; color: white; padding: 20px; width: 80%;\" (click)=\"toggle()\">{{title}}  </div>\n    <div  [hidden]=\"!opened\"><ng-content></ng-content></div>\n  </div>",
            inputs: ['title'],
            directives: [map_directive_1.MapDirective]
        }), 
        __metadata('design:paramtypes', [googleAPIService_service_1.GoogleApiService])
    ], Panel);
    return Panel;
}());
exports.Panel = Panel;
//# sourceMappingURL=panel.js.map