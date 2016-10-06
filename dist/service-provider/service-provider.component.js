/**
 * Created by Abhi on 6/11/16.
 */
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
var router_deprecated_1 = require('@angular/router-deprecated');
var core_1 = require('@angular/core');
var service_provider_details_1 = require('./../services/service-provider-details');
var service_provider_crud_service_1 = require('./../services/service-provider-crud.service');
require('./../rxjs-operators');
var angular2_jwt_1 = require('angular2-jwt');
var googleAPIService_service_1 = require("../services/googleAPIService.service");
var panel_1 = require("../profile/panel");
var ServiceProviderComponent = (function () {
    function ServiceProviderComponent(router, panel, googleApi, serviceProviderCRUDService, routeParams) {
        this.router = router;
        this.panel = panel;
        this.googleApi = googleApi;
        this.serviceProviderCRUDService = serviceProviderCRUDService;
        this.routeParams = routeParams;
        this.mode = 'Observable';
        this.model = new service_provider_details_1.ServiceProviderDetails();
        this.showDetails = false;
        this.isLoading = false;
        this.submitted = false;
        this.fetchingCurrentAddress = false;
        this.isCurrentAddressLoading = false;
        this.fetchingDestinationAddress = false;
        this.isDestinationAddressLoading = false;
        this.parcelOrderSelected = false;
        this.itineraryCityArray = [];
        this.itinerary = {};
        this.componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };
        this.states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
        this.cities = [];
        this.SwitchFuction = function (state) {
            switch (state) {
                case 'Alabama':
                    this.cities = ["Alabama cities"];
                    break;
                case 'Alaska':
                    this.cities = ["Alaska cities"];
                    break;
                default: this.cities = [];
            }
        };
        this.model.itineraryCity = [];
    }
    ServiceProviderComponent.prototype.onSubmit = function () {
        this.isLoading = true;
        this.submitted = true;
        if (this.profile["id"] != null) {
            this.model["_id"] = this.profile.id;
        }
        this.model['email'] = this.profile.email;
        this.currentCityName = this.model['currentCity'].split(" ");
        this.model['currentCity'] = "";
        for (var i = 0; i < this.currentCityName.length; i++) {
            this.currentCityName[i] = this.currentCityName[i].charAt(0).toUpperCase() + this.currentCityName[i].slice(1).toLowerCase();
            this.model['currentCity'] = this.model['currentCity'] + this.currentCityName[i];
            if (i + 1 < this.currentCityName.length) {
                this.model['currentCity'] = this.model['currentCity'] + " ";
            }
        }
        this.destinationCityName = this.model['destinationCity'].split(" ");
        this.model['destinationCity'] = "";
        for (var i = 0; i < this.destinationCityName.length; i++) {
            this.destinationCityName[i] = this.destinationCityName[i].charAt(0).toUpperCase() + this.destinationCityName[i].slice(1).toLowerCase();
            this.model['destinationCity'] = this.model['destinationCity'] + this.destinationCityName[i];
            if (i + 1 < this.destinationCityName.length) {
                this.model['destinationCity'] = this.model['destinationCity'] + " ";
            }
        }
        if (this.model !== null) {
            this.saveServiceProviderDetails(this.model);
        }
    };
    ServiceProviderComponent.prototype.selectParcel = function (parcel) {
        parcel['serviceProvider'] = this.model;
        this.parcelOrderSelected = true;
        this.selectParcelOrder(parcel);
    };
    ServiceProviderComponent.prototype.initializeFlag = function () {
        this.submitted = false;
        this.parcelOrderSelected = false;
        this.isLoading = false;
    };
    ServiceProviderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.googleApi.initAutocomplete().then(function () {
            // Create the autocomplete object, restricting the search to geographical
            // location types.
            _this.currentAddressAutocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (document.getElementById('currentaddressautocomplete')), { types: ['geocode'] });
            _this.destinationAddressAutocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (document.getElementById('destinationaddressautocomplete')), { types: ['geocode'] });
            _this.itineraryCityAutocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (document.getElementById('itinerarycityautocomplete')), { types: ['geocode'] });
        });
        this.profile = JSON.parse(localStorage.getItem('profile'));
        var id = this.routeParams.get('id');
        if (id != null) {
            this.profile["id"] = id;
            this.model["_id"] = id;
        }
        this.getServiceProviderDetails(this.profile);
    };
    ServiceProviderComponent.prototype.addSenderDistanceAndDuration = function (requests) {
        for (var request in requests) {
            var req = request;
            //noinspection TypeScriptUnresolvedVariable
            this.panel.getDistanceAndDuration(requests[request].currentAddreddaddressLine1 + ' ' + requests[request].currentAddreddaddressLine2 + ' ' + requests[request].currentCity
                + ' ' + requests[request].currentState + ' ' + requests[request].currentZip, this.model.currentAddreddaddressLine1 + ' ' + this.model.currentAddreddaddressLine2 + ' ' + this.model.currentCity
                + ' ' + this.model.currentState + ' ' + this.model.currentZip, req, function (req, distanceAndDurationToSender) {
                requests[req]["SenderDistanceAndDuration"] = distanceAndDurationToSender;
                console.log(req);
                return distanceAndDurationToSender;
            });
        }
    };
    ServiceProviderComponent.prototype.addReceiverDistanceAndDuration = function (requests) {
        for (var request in requests) {
            var req = request;
            //noinspection TypeScriptUnresolvedVariable
            this.panel.getDistanceAndDuration(requests[request].deliveryAddreddaddressLine1 + ' ' + requests[request].deliveryAddreddaddressLine2 + ' ' + requests[request].deliveryCity
                + ' ' + requests[request].deliveryState + ' ' + requests[request].deliveryZip, this.model.destinationAddreddaddressLine1 + ' ' + this.model.destinationAddreddaddressLine2 + ' ' + this.model.destinationCity
                + ' ' + this.model.destinationState + ' ' + this.model.destinationZip, req, function (req, distanceAndDurationToSender) {
                requests[req]["ReceiverDistanceAndDuration"] = distanceAndDurationToSender;
                console.log(req);
                return distanceAndDurationToSender;
            });
        }
    };
    ServiceProviderComponent.prototype.fillInAddress = function (addressType) {
        var _this = this;
        // Get the place details from the autocomplete object.
        if (addressType == "Current Address") {
            var place_1 = this.currentAddressAutocomplete.getPlace();
            this.model['currentAddreddaddressLine1'] = "";
            this.model['currentAddreddaddressLine2'] = "";
            this.model['currentCity'] = "";
            this.model['currentState'] = "";
            this.model['currentZip'] = "";
            // Get each component of the address from the place details
            // and fill the corresponding field on the form.
            if (place_1 != null && place_1.address_components != null) {
                for (var i = 0; i < place_1.address_components.length; i++) {
                    var addressType_1 = place_1.address_components[i].types[0];
                    if (this.componentForm[addressType_1]) {
                        var val = place_1.address_components[i][this.componentForm[addressType_1]];
                        if (addressType_1 == 'street_number') {
                            this.model['currentAddreddaddressLine1'] = val;
                        }
                        else if (addressType_1 == 'route') {
                            this.model['currentAddreddaddressLine2'] = val;
                        }
                        else if (addressType_1 == 'locality') {
                            this.model['currentCity'] = val;
                        }
                        else if (addressType_1 == 'administrative_area_level_1') {
                            this.model['currentState'] = val;
                        }
                        else if (addressType_1 == 'postal_code') {
                            this.model['currentZip'] = val;
                        }
                    }
                }
                if (place_1.address_components.length > 0) {
                    setTimeout(function () {
                        _this.isCurrentAddressLoading = false;
                        _this.fetchingCurrentAddress = true;
                        place_1['address_components'] = null;
                    }, 1);
                }
            }
        }
        if (addressType == "Destination Address") {
            var place_2 = this.destinationAddressAutocomplete.getPlace();
            this.model['destinationAddreddaddressLine1'] = "";
            this.model['destinationAddreddaddressLine2'] = "";
            this.model['destinationCity'] = "";
            this.model['destinationState'] = "";
            this.model['destinationZip'] = "";
            // Get each component of the address from the place details
            // and fill the corresponding field on the form.
            if (place_2 != null && place_2.address_components != null) {
                for (var i = 0; i < place_2.address_components.length; i++) {
                    var addressType_2 = place_2.address_components[i].types[0];
                    if (this.componentForm[addressType_2]) {
                        var val = place_2.address_components[i][this.componentForm[addressType_2]];
                        if (addressType_2 == 'street_number') {
                            this.model['destinationAddreddaddressLine1'] = val;
                        }
                        else if (addressType_2 == 'route') {
                            this.model['destinationAddreddaddressLine2'] = val;
                        }
                        else if (addressType_2 == 'locality') {
                            this.model['destinationCity'] = val;
                        }
                        else if (addressType_2 == 'administrative_area_level_1') {
                            this.model['destinationState'] = val;
                        }
                        else if (addressType_2 == 'postal_code') {
                            this.model['destinationZip'] = val;
                        }
                    }
                }
                if (place_2.address_components.length > 0) {
                    setTimeout(function () {
                        _this.isDestinationAddressLoading = false;
                        _this.fetchingDestinationAddress = true;
                        place_2['address_components'] = null;
                    }, 1);
                }
            }
        }
    };
    ServiceProviderComponent.prototype.geolocate = function (addressType) {
        var _this = this;
        if (addressType == "Current Address") {
            this.isCurrentAddressLoading = true;
            this.fetchingCurrentAddress = false;
        }
        if (addressType == "Destination Address") {
            this.isDestinationAddressLoading = true;
            this.fetchingDestinationAddress = false;
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                //noinspection TypeScriptValidateTypes
                _this.circle = new google.maps.Circle({
                    center: _this.geolocation,
                    radius: position.coords.accuracy
                });
                if (addressType == "Current Address") {
                    _this.currentAddressAutocomplete.setBounds(_this.circle.getBounds());
                    _this.fillInAddress(addressType);
                }
                if (addressType == "Destination Address") {
                    _this.destinationAddressAutocomplete.setBounds(_this.circle.getBounds());
                    _this.fillInAddress(addressType);
                }
            });
        }
    };
    ServiceProviderComponent.prototype.itineraryCity = function () {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                //noinspection TypeScriptValidateTypes
                _this.circle = new google.maps.Circle({
                    center: _this.geolocation,
                    radius: position.coords.accuracy
                });
                _this.itineraryCityAutocomplete.setBounds(_this.circle.getBounds());
            });
        }
    };
    ServiceProviderComponent.prototype.addItinerary = function () {
        this.itinerary = {};
        var place = this.itineraryCityAutocomplete.getPlace();
        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        if (place != null && place.address_components != null) {
            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (this.componentForm[addressType]) {
                    var val = place.address_components[i][this.componentForm[addressType]];
                    if (addressType == 'locality') {
                        this.itinerary['city'] = val;
                    }
                    else if (addressType == 'administrative_area_level_1') {
                        this.itinerary['state'] = val;
                    }
                    else if (addressType == 'postal_code') {
                        this.itinerary['zip'] = val;
                    }
                }
            }
            this.itineraryCityArray.push(this.itinerary);
            this.model.itineraryCity = this.itineraryCityArray;
            console.log(this.model.itineraryCity);
            if (place.address_components.length > 0) {
                setTimeout(function () {
                    place['address_components'] = null;
                }, 1);
            }
        }
    };
    ServiceProviderComponent.prototype.saveServiceProviderDetails = function (serviceProviderDetails) {
        var _this = this;
        if (!serviceProviderDetails) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        this.serviceProviderCRUDService.save(serviceProviderDetails)
            .subscribe(function (data) {
            _this.requests = data;
            _this.addSenderDistanceAndDuration(_this.requests);
            _this.addReceiverDistanceAndDuration(_this.requests);
            setTimeout(function () {
                _this.isLoading = false;
            }, 3000);
            if (_this.requests.length > 0) {
                _this.showDetails = true;
            }
            else {
                if (_this.profile["id"] != null) {
                    _this.router.navigate(['Profile']);
                }
                _this.showDetails = false;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    ServiceProviderComponent.prototype.selectParcelOrder = function (senderData) {
        var _this = this;
        if (!senderData) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        this.serviceProviderCRUDService.selectParcelOrder(senderData)
            .subscribe(function (data) {
            _this.requests = [];
            _this.requests = data;
            if (_this.requests.length > 0) {
                _this.showDetails = true;
            }
            else {
                if (_this.profile["id"] != null) {
                    _this.router.navigate(['Profile']);
                }
                _this.showDetails = false;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    ServiceProviderComponent.prototype.getServiceProviderDetails = function (data) {
        var _this = this;
        if (!this.profile.email) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.serviceProviderCRUDService.getServiceProviderDetails(data)
            .subscribe(function (data) {
            _this.data = data;
            if (_this.data[0].serviceProvider) {
                delete _this.data[0].serviceProvider['_id'];
                _this.model = _this.data[0].serviceProvider;
            }
            else {
                delete _this.data[0]['_id'];
                _this.model = _this.data[0];
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    ServiceProviderComponent.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    ServiceProviderComponent.prototype.onChange = function (selectedState) {
        // this.SwitchFuction(selectedState);
    };
    ServiceProviderComponent = __decorate([
        core_1.Component({
            selector: 'service-provider',
            templateUrl: 'app/service-provider/service-provider.component.html',
            styleUrls: ['app/service-provider/service-provider.component.css'],
            providers: [service_provider_crud_service_1.ServiceProviderCRUDService, panel_1.Panel],
            directives: [panel_1.Panel],
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, panel_1.Panel, googleAPIService_service_1.GoogleApiService, service_provider_crud_service_1.ServiceProviderCRUDService, router_deprecated_1.RouteParams])
    ], ServiceProviderComponent);
    return ServiceProviderComponent;
}());
exports.ServiceProviderComponent = ServiceProviderComponent;
//# sourceMappingURL=service-provider.component.js.map