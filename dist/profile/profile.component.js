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
var ProfileComponent = (function () {
    function ProfileComponent(requestsService, authHttp) {
        this.requestsService = requestsService;
        this.authHttp = authHttp;
        this.parcelGiven = false;
        this.parcelCollected = false;
        this.parcelDelivered = false;
        this.parcelReceived = false;
        this.showDetails = false;
        this.requestType = false;
    }
    ProfileComponent.prototype.onAssignedServiceClick = function () {
        console.log(this.profile);
        this.getAssignedServiceRequests(this.profile);
    };
    ProfileComponent.prototype.onUnassignedServiceClick = function () {
        console.log(this.profile);
        this.getUnassignedServiceRequests(this.profile);
    };
    ProfileComponent.prototype.onAssignedSenderClick = function () {
        console.log(this.profile);
        this.getAssignedSenderRequests(this.profile);
    };
    ProfileComponent.prototype.onUnassignedSenderClick = function () {
        console.log(this.profile);
        this.getUnassignedSenderRequests(this.profile);
    };
    ProfileComponent.prototype.onReceivingRequestStatusClick = function () {
        console.log(this.profile);
        this.getParcelReceivingRequests(this.profile);
    };
    ProfileComponent.prototype.onStatusChangeClick = function (parcelId) {
        console.log(parcelId);
        this.changeParcelStatus({ email: this.profile.email, parcelId: parcelId }, this.getAssignedSenderRequests(this.profile));
    };
    ProfileComponent.prototype.ngOnInit = function () {
        console.log('ngOnInit() called');
        this.profile = JSON.parse(localStorage.getItem('profile'));
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        console.log('ngOnDestroy() called');
    };
    ProfileComponent.prototype.ngAfterContentInit = function () {
        console.log('ngAfterContentInit() called');
    };
    // getSecretThing() {
    //     this.authHttp.get('http://localhost:9000/service-request')
    //         .subscribe(
    //             data => {
    //                 console.log(data);
    //                 this.serviceRequests = JSON.stringify(data.json());
    //             },
    //             err => console.log(err),
    //             () => console.log('Complete')
    //         );
    // }
    ProfileComponent.prototype.getAssignedServiceRequests = function (data) {
        var _this = this;
        if (!this.profile.email) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getAssignedServiceRequests(data)
            .subscribe(function (data) {
            _this.assignedServiceRequests = data;
            console.log(_this.assignedServiceRequests);
            console.log(_this.parcelRequests);
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
            console.log(_this.unassignedServiceRequests);
            console.log(_this.parcelRequests);
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
            console.log(_this.parcelRequests);
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
    ProfileComponent.prototype.getUnassignedSenderRequests = function (data) {
        var _this = this;
        if (!this.profile.email) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getUnassignedSenderRequests(data)
            .subscribe(function (data) {
            _this.parcelRequests = data;
            console.log(_this.parcelRequests);
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
            console.log(_this.parcelRequests);
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
            console.log(_this.res.status);
            console.log(_this.res.role);
            //noinspection TypeScriptUnresolvedVariable
            if (_this.res.role === "Sender") {
                console.log("in sender");
                _this.getAssignedSenderRequests(_this.profile);
            }
            else {
                if (_this.res.role === "Provider") {
                    console.log("in provider");
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
    ProfileComponent.prototype.loggedIn = function () {
        return angular2_jwt_2.tokenNotExpired();
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            templateUrl: 'app/profile/profile.html',
            styleUrls: ['app/profile/profile.css'],
            providers: [request_service_1.RequestsService]
        }), 
        __metadata('design:paramtypes', [request_service_1.RequestsService, angular2_jwt_1.AuthHttp])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map