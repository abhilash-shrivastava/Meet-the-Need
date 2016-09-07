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
var panel_1 = require('./panel');
var ProfileComponent = (function () {
    function ProfileComponent(router, requestsService, panel, renderer, authHttp) {
        this.router = router;
        this.requestsService = requestsService;
        this.panel = panel;
        this.renderer = renderer;
        this.authHttp = authHttp;
        this.title = 'test title';
        this.parcelGiven = false;
        this.parcelCollected = false;
        this.parcelDelivered = false;
        this.parcelReceived = false;
        this.showDetails = false;
        this.requestType = false;
    }
    ProfileComponent.prototype.mapLoadAssignedService = function (id, currentSenderAddress, currentServiceAddress, deliveryAddress, destinationAddress, status) {
        this.currentServiceAddress = currentServiceAddress;
        this.currentSenderAddress = currentSenderAddress;
        this.deliveryAddress = deliveryAddress;
        this.destinationAddress = destinationAddress;
        this.status = status;
        if (this.id !== id && status == 'Assigned To Service Provider') {
            this.id = id;
            this.panel.initMap(this.id, this.currentServiceAddress, this.currentSenderAddress);
            this.mapAddress = "Map Direction To Parcel Sender";
        }
        if (this.id !== id && (status == 'Parcel Given To Service Provider' || status == 'Parcel Collected From Sender' || status == 'Parcel Delivered To Receiver' || status == 'Parcel Received From Service Provider')) {
            this.id = id;
            this.panel.initMap(this.id, this.destinationAddress, this.deliveryAddress);
            this.mapAddress = "Map Direction To Receiver";
        }
    };
    ProfileComponent.prototype.mapLoadAssignedParcel = function (id, currentSenderAddress, currentServiceAddress, deliveryAddress, destinationAddress, status) {
        this.currentServiceAddress = currentServiceAddress;
        this.currentSenderAddress = currentSenderAddress;
        this.deliveryAddress = deliveryAddress;
        this.destinationAddress = destinationAddress;
        if (this.id !== id && status == 'Assigned To Service Provider') {
            this.id = id;
            this.panel.initMap(this.id, this.currentSenderAddress, this.currentServiceAddress);
            this.mapAddress = "Map Direction To Service Provider";
        }
        if (this.id !== id && (status == 'Parcel Given To Service Provider' || status == 'Parcel Collected From Sender' || status == 'Parcel Delivered To Receiver' || status == 'Parcel Received From Service Provider')) {
            this.id = id;
            this.panel.initMap(this.id, this.deliveryAddress, this.destinationAddress);
            this.mapAddress = "Map Direction Between Service Provider and Receiver";
        }
    };
    ProfileComponent.prototype.mapLoadAssignedReceiver = function (id, currentSenderAddress, currentServiceAddress, deliveryAddress, destinationAddress, status) {
        this.currentServiceAddress = currentServiceAddress;
        this.currentSenderAddress = currentSenderAddress;
        this.deliveryAddress = deliveryAddress;
        this.destinationAddress = destinationAddress;
        if (this.id !== id && status == 'Assigned To Service Provider') {
            this.id = id;
            this.panel.initMap(this.id, this.currentSenderAddress, this.currentServiceAddress);
            this.mapAddress = "Map Direction Between Service Provider and Parcel Sender";
        }
        if (this.id !== id && (status == 'Parcel Given To Service Provider' || status == 'Parcel Collected From Sender' || status == 'Parcel Delivered To Receiver' || status == 'Parcel Received From Service Provider')) {
            this.id = id;
            this.panel.initMap(this.id, this.deliveryAddress, this.destinationAddress);
            this.mapAddress = "Map Direction To Service Provider";
        }
    };
    ProfileComponent.prototype.onAssignedServiceClick = function () {
        this.closeNav();
        this.status = null;
        this.id = null;
        this.getAssignedServiceRequests(this.profile);
    };
    ProfileComponent.prototype.onUnassignedServiceClick = function () {
        this.closeNav();
        this.status = null;
        this.getUnassignedServiceRequests(this.profile);
    };
    ProfileComponent.prototype.onAssignedSenderClick = function () {
        this.closeNav();
        this.status = null;
        this.id = null;
        this.getAssignedSenderRequests(this.profile);
    };
    ProfileComponent.prototype.onUnassignedSenderClick = function () {
        this.closeNav();
        this.status = null;
        this.getUnassignedSenderRequests(this.profile);
    };
    ProfileComponent.prototype.onReceivingRequestStatusClick = function () {
        this.closeNav();
        this.status = null;
        this.id = null;
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
    ProfileComponent.prototype.ngAfterViewInit = function () {
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
                _this.openNav();
            }
            else {
                delete _this.parcelRequests;
                delete _this.unassignedServiceRequests;
                delete _this.parcelReceivingRequests;
                _this.showDetails = false;
                _this.requestType = true;
            }
            _this.id = null;
            _this.mapLoadAssignedService(_this.id, _this.currentServiceAddress, _this.currentSenderAddress, _this.deliveryAddress, _this.destinationAddress, _this.status);
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
                _this.openNav();
            }
            else {
                delete _this.unassignedServiceRequests;
                delete _this.assignedServiceRequests;
                delete _this.parcelReceivingRequests;
                _this.showDetails = false;
                _this.requestType = false;
            }
            _this.id = null;
            _this.mapLoadAssignedParcel(_this.id, _this.currentServiceAddress, _this.currentSenderAddress, _this.deliveryAddress, _this.destinationAddress, _this.status);
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
                _this.openNav();
            }
            else {
                delete _this.unassignedServiceRequests;
                delete _this.assignedServiceRequests;
                delete _this.parcelRequests;
                _this.showDetails = false;
            }
            _this.id = null;
            _this.mapLoadAssignedReceiver(_this.id, _this.currentServiceAddress, _this.currentSenderAddress, _this.deliveryAddress, _this.destinationAddress, _this.status);
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
            _this.id = null;
            _this.res = data;
            console.log("changed");
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
    ProfileComponent.prototype.openNav = function () {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.2)";
    };
    ProfileComponent.prototype.closeNav = function () {
        this.status = null;
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.body.style.backgroundColor = "white";
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            templateUrl: 'app/profile/profile.html',
            styleUrls: ['app/profile/profile.css'],
            providers: [ng2_pagination_1.PaginationService, request_service_1.RequestsService, panel_1.Panel],
            directives: [ng2_pagination_1.PaginationControlsCmp, panel_1.Panel],
            pipes: [ng2_pagination_1.PaginatePipe]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, request_service_1.RequestsService, panel_1.Panel, core_1.Renderer, angular2_jwt_1.AuthHttp])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map