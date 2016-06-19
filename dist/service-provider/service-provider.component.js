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
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var service_provider_details_1 = require('./../services/service-provider-details');
var service_provider_crud_service_1 = require('./../services/service-provider-crud.service');
require('./../rxjs-operators');
var angular2_jwt_1 = require('angular2-jwt');
//var fetch = require('node-fetch');
var ServiceProviderComponent = (function () {
    function ServiceProviderComponent(serviceProviderCRUDService, routeParams) {
        this.serviceProviderCRUDService = serviceProviderCRUDService;
        this.routeParams = routeParams;
        this.mode = 'Observable';
        this.model = new service_provider_details_1.ServiceProviderDetails();
        this.submitted = false;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
    }
    ServiceProviderComponent.prototype.onSubmit = function () {
        this.submitted = true;
        console.log(this.model);
        this.saveServiceProviderDetails(this.model);
    };
    ServiceProviderComponent.prototype.saveServiceProviderDetails = function (serviceProviderDetails) {
        var _this = this;
        if (!serviceProviderDetails) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.serviceProviderCRUDService.save(serviceProviderDetails)
            .subscribe(function (data) { return _this.status = JSON.stringify(data); }, function (error) { return _this.errorMessage = error; });
    };
    ServiceProviderComponent.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', service_provider_details_1.ServiceProviderDetails)
    ], ServiceProviderComponent.prototype, "serviceProviderDetails", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ServiceProviderComponent.prototype, "close", void 0);
    ServiceProviderComponent = __decorate([
        core_1.Component({
            selector: 'service-provider',
            templateUrl: 'app/service-provider/service-provider.component.html',
            styleUrls: ['app/service-provider/service-provider.component.css'],
            providers: [service_provider_crud_service_1.ServiceProviderCRUDService]
        }), 
        __metadata('design:paramtypes', [service_provider_crud_service_1.ServiceProviderCRUDService, router_deprecated_1.RouteParams])
    ], ServiceProviderComponent);
    return ServiceProviderComponent;
}());
exports.ServiceProviderComponent = ServiceProviderComponent;
//# sourceMappingURL=service-provider.component.js.map