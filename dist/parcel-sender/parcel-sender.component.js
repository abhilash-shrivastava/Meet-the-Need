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
        this.submitted = false;
    }
    ParcelSenderComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.model !== null) {
            this.saveParcelSenderDetails(this.model);
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
            console.log(data);
            _this.requests = data;
            console.log(_this.requests);
            if (_this.requests.length > 0) {
                _this.showDetails = true;
            }
            else {
                _this.showDetails = false;
            }
        }, function (error) { return _this.errorMessage = error; });
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