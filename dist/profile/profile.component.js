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
        if (requestType == 'Service') {
            this.cancelRequest({ requestId: requestId, requestType: requestType }, this.onUnassignedServiceClick());
        }
        if (requestType == 'Parcel') {
            this.cancelRequest({ requestId: requestId, requestType: requestType }, this.onUnassignedSenderClick());
        }
    };
    ProfileComponent.prototype.onUpdateClick = function (requestId, requestType) {
        // if (requestType == 'Service'){
        //     this.updateRequest({requestId: requestId, requestType: requestType}, this.onUnassignedServiceClick())
        // }
        // if (requestType == 'Parcel'){
        //     this.updateRequest({requestId: requestId, requestType: requestType}, this.onUnassignedSenderClick())
        // }
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
    ProfileComponent.prototype.updateRequest = function (data, callback) {
        var _this = this;
        if (!data.requestId || !data.requestType) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.updateRequest(data)
            .subscribe(function (data) {
            _this.res = data;
            if (_this.res[0].email) {
                console.log("go to service");
                window.location.href = 'localhost:3000/service-provider';
            }
            else {
                console.log("go to parcel");
                window.location.href = 'localhost:3000/parcel-sender';
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