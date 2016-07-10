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
var ParcelSenderComponent = (function () {
    function ParcelSenderComponent(parcelSenderCRUDService, routeParams) {
        this.parcelSenderCRUDService = parcelSenderCRUDService;
        this.routeParams = routeParams;
        this.mode = 'Observable';
        this.model = new parcel_sender_details_1.ParcelSenderDetails();
        this.showDetails = false;
        this.states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
        this.submitted = false;
    }
    ParcelSenderComponent.prototype.onSubmit = function () {
        this.submitted = true;
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
    ParcelSenderComponent.prototype.ngOnInit = function () {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.getParcelSenderDetails(this.profile);
    };
    ParcelSenderComponent.prototype.saveParcelSenderDetails = function (parcelSenderDetails) {
        var _this = this;
        if (!parcelSenderDetails) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        this.parcelSenderCRUDService.save(parcelSenderDetails)
            .subscribe(function (data) {
            _this.requests = data;
            if (_this.requests.length > 0) {
                _this.showDetails = true;
            }
            else {
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
        __metadata('design:paramtypes', [parcel_sender_crud_service_1.ParcelSenderCRUDService, router_deprecated_1.RouteParams])
    ], ParcelSenderComponent);
    return ParcelSenderComponent;
}());
exports.ParcelSenderComponent = ParcelSenderComponent;
//# sourceMappingURL=parcel-sender.component.js.map