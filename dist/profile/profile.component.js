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
    ProfileComponent.prototype.getSecretThing = function () {
        var _this = this;
        this.authHttp.get('http://localhost:9000/service-request')
            .subscribe(function (data) {
            console.log(data);
            _this.serviceRequests = JSON.stringify(data.json());
        }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
    };
    ProfileComponent.prototype.getAssignedServiceRequests = function (data) {
        var _this = this;
        if (!this.profile.email) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.requestsService.getAssignedServiceRequests(data)
            .subscribe(function (data) {
            _this.serviceRequests = data;
            console.log(_this.serviceRequests);
            console.log(_this.parcelRequests);
            if (_this.serviceRequests.length > 0) {
                delete _this.parcelRequests;
                _this.showDetails = true;
                _this.requestType = true;
            }
            else {
                delete _this.parcelRequests;
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
            _this.serviceRequests = data;
            console.log(_this.serviceRequests);
            console.log(_this.parcelRequests);
            if (_this.serviceRequests.length > 0) {
                delete _this.parcelRequests;
                _this.showDetails = true;
                _this.requestType = true;
            }
            else {
                delete _this.parcelRequests;
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
            console.log(_this.serviceRequests);
            console.log(_this.parcelRequests);
            if (_this.parcelRequests.length > 0) {
                delete _this.serviceRequests;
                _this.showDetails = true;
                _this.requestType = false;
            }
            else {
                delete _this.serviceRequests;
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
            console.log(_this.serviceRequests);
            console.log(_this.parcelRequests);
            if (_this.parcelRequests.length > 0) {
                _this.showDetails = true;
                _this.requestType = false;
            }
            else {
                _this.showDetails = false;
                _this.requestType = false;
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
            providers: [request_service_1.RequestsService]
        }), 
        __metadata('design:paramtypes', [request_service_1.RequestsService, angular2_jwt_1.AuthHttp])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map