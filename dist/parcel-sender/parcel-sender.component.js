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
var angular2_jwt_1 = require('angular2-jwt');
var parcel_sender_details_1 = require("../services/parcel-sender-details");
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var parcel_sender_crud_service_1 = require('./../services/parcel-sender-crud.service');
var googleAPIService_service_1 = require("../services/googleAPIService.service");
var ParcelSenderComponent = (function () {
    function ParcelSenderComponent(router, googleApi, parcelSenderCRUDService, routeParams) {
        this.router = router;
        this.googleApi = googleApi;
        this.parcelSenderCRUDService = parcelSenderCRUDService;
        this.routeParams = routeParams;
        this.mode = 'Observable';
        this.model = new parcel_sender_details_1.ParcelSenderDetails();
        this.showDetails = false;
        this.isLoading = false;
        this.fetchingCurrentAddress = false;
        this.isCurrentAddressLoading = false;
        this.fetchingDeliveryAddress = false;
        this.isDeliveryAddressLoading = false;
        this.serviceProviderSelected = false;
        this.submitted = false;
        this.componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };
        this.states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
    }
    ParcelSenderComponent.prototype.onSubmit = function () {
        console.log(this.model);
        this.isLoading = true;
        this.submitted = true;
        if (this.profile["id"] != null) {
            this.model["_id"] = this.profile.id;
        }
        this.model['senderEmail'] = this.profile.email;
        this.currentCityName = this.model['currentCity'].split(" ");
        this.model['currentCity'] = "";
        for (var i = 0; i < this.currentCityName.length; i++) {
            this.currentCityName[i] = this.currentCityName[i].charAt(0).toUpperCase() + this.currentCityName[i].slice(1).toLowerCase();
            this.model['currentCity'] = this.model['currentCity'] + this.currentCityName[i];
            if (i + 1 < this.currentCityName.length) {
                this.model['currentCity'] = this.model['currentCity'] + " ";
            }
        }
        this.deliveryCityName = this.model['deliveryCity'].split(" ");
        this.model['deliveryCity'] = "";
        for (var i = 0; i < this.deliveryCityName.length; i++) {
            this.deliveryCityName[i] = this.deliveryCityName[i].charAt(0).toUpperCase() + this.deliveryCityName[i].slice(1).toLowerCase();
            this.model['deliveryCity'] = this.model['deliveryCity'] + this.deliveryCityName[i];
            if (i + 1 < this.deliveryCityName.length) {
                this.model['deliveryCity'] = this.model['deliveryCity'] + " ";
            }
        }
        if (this.model !== null) {
            this.saveParcelSenderDetails(this.model);
        }
    };
    ParcelSenderComponent.prototype.selectProvider = function (provider) {
        this.model['serviceProvider'] = provider;
        this.serviceProviderSelected = true;
        this.selectServiceProvider(this.model);
    };
    ParcelSenderComponent.prototype.initializeFlag = function () {
        this.submitted = false;
        this.serviceProviderSelected = false;
        this.isLoading = false;
    };
    ParcelSenderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.googleApi.initAutocomplete().then(function () {
            // Create the autocomplete object, restricting the search to geographical
            // location types.
            _this.currentAddressAutocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (document.getElementById('currentaddressautocomplete')), { types: ['geocode'] });
            _this.deliveryAddressAutocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (document.getElementById('deliveryaddressautocomplete')), { types: ['geocode'] });
        });
        this.profile = JSON.parse(localStorage.getItem('profile'));
        var id = this.routeParams.get('id');
        if (id != null) {
            this.profile["id"] = id;
            this.model["_id"] = id;
        }
        this.getParcelSenderDetails(this.profile);
    };
    ParcelSenderComponent.prototype.fillInAddress = function (addressType) {
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
        if (addressType == "Delivery Address") {
            var place_2 = this.deliveryAddressAutocomplete.getPlace();
            this.model['deliveryAddreddaddressLine1'] = "";
            this.model['deliveryAddreddaddressLine2'] = "";
            this.model['deliveryCity'] = "";
            this.model['deliveryState'] = "";
            this.model['deliveryZip'] = "";
            // Get each component of the address from the place details
            // and fill the corresponding field on the form.
            if (place_2 != null && place_2.address_components != null) {
                for (var i = 0; i < place_2.address_components.length; i++) {
                    var addressType_2 = place_2.address_components[i].types[0];
                    if (this.componentForm[addressType_2]) {
                        var val = place_2.address_components[i][this.componentForm[addressType_2]];
                        if (addressType_2 == 'street_number') {
                            this.model['deliveryAddreddaddressLine1'] = val;
                        }
                        else if (addressType_2 == 'route') {
                            this.model['deliveryAddreddaddressLine2'] = val;
                        }
                        else if (addressType_2 == 'locality') {
                            this.model['deliveryCity'] = val;
                        }
                        else if (addressType_2 == 'administrative_area_level_1') {
                            this.model['deliveryState'] = val;
                        }
                        else if (addressType_2 == 'postal_code') {
                            this.model['deliveryZip'] = val;
                        }
                    }
                }
                if (place_2.address_components.length > 0) {
                    setTimeout(function () {
                        _this.isDeliveryAddressLoading = false;
                        _this.fetchingDeliveryAddress = true;
                        place_2['address_components'] = null;
                    }, 1);
                }
            }
        }
    };
    ParcelSenderComponent.prototype.geolocate = function (addressType) {
        var _this = this;
        if (addressType == "Current Address") {
            this.isCurrentAddressLoading = true;
            this.fetchingCurrentAddress = false;
        }
        if (addressType == "Delivery Address") {
            this.isDeliveryAddressLoading = true;
            this.fetchingDeliveryAddress = false;
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
                if (addressType == "Delivery Address") {
                    _this.deliveryAddressAutocomplete.setBounds(_this.circle.getBounds());
                    _this.fillInAddress(addressType);
                }
            });
        }
    };
    ParcelSenderComponent.prototype.saveParcelSenderDetails = function (parcelSenderDetails) {
        var _this = this;
        if (!parcelSenderDetails) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        this.parcelSenderCRUDService.save(parcelSenderDetails)
            .subscribe(function (data) {
            setTimeout(function () {
                _this.isLoading = false;
            }, 3000);
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
    ParcelSenderComponent.prototype.selectServiceProvider = function (senderData) {
        var _this = this;
        if (!senderData) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        this.parcelSenderCRUDService.selectServiceProvider(senderData)
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
    ParcelSenderComponent.prototype.getParcelSenderDetails = function (data) {
        var _this = this;
        if (!this.profile.email) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.parcelSenderCRUDService.getParcelSenderDetails(data)
            .subscribe(function (data) {
            _this.data = data;
            delete _this.data[0]['status'];
            delete _this.data[0]['_id'];
            if (_this.data[0]['serviceProvider']) {
                delete _this.data[0]['serviceProvider'];
            }
            _this.model = _this.data[0];
        }, function (error) { return _this.errorMessage = error; });
    };
    ParcelSenderComponent.prototype.onChange = function (selectedState) {
        // this.SwitchFuction(selectedState);
    };
    ParcelSenderComponent.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    ParcelSenderComponent = __decorate([
        core_1.Component({
            selector: 'parcel-sender',
            templateUrl: 'app/parcel-sender/parcel-sender.component.html',
            styleUrls: ['app/parcel-sender/parcel-sender.component.css'],
            providers: [parcel_sender_crud_service_1.ParcelSenderCRUDService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, googleAPIService_service_1.GoogleApiService, parcel_sender_crud_service_1.ParcelSenderCRUDService, router_deprecated_1.RouteParams])
    ], ParcelSenderComponent);
    return ParcelSenderComponent;
}());
exports.ParcelSenderComponent = ParcelSenderComponent;
//# sourceMappingURL=parcel-sender.component.js.map