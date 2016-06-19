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
        this.submitted = false;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
    }
    ParcelSenderComponent.prototype.onSubmit = function () {
        this.submitted = true;
        console.log(this.model);
        this.saveParcelSenderDetails(this.model);
    };
    ParcelSenderComponent.prototype.saveParcelSenderDetails = function (parcelSenderDetails) {
        var _this = this;
        if (!parcelSenderDetails) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.parcelSenderCRUDService.save(parcelSenderDetails)
            .subscribe(function (data) { return _this.status = JSON.stringify(data); }, function (error) { return _this.errorMessage = error; });
    };
    ParcelSenderComponent.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', parcel_sender_details_1.ParcelSenderDetails)
    ], ParcelSenderComponent.prototype, "parcelSenderDetails", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ParcelSenderComponent.prototype, "close", void 0);
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