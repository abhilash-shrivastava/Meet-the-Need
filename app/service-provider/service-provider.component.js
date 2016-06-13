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
//var fetch = require('node-fetch');
var ServiceProviderComponent = (function () {
    function ServiceProviderComponent(serviceProviderCRUDService, routeParams) {
        this.serviceProviderCRUDService = serviceProviderCRUDService;
        this.routeParams = routeParams;
        //model = new ServiceProvider('Abhilash', 'abhilash.shrivastava@hotmail.com', 2485679221, {'50 Chumasero Drive', 'Apt 4k', 'San Francisco', 'CA'}, {'50 Chumasero Drive', 'Apt 4k', 'San Francisco', 'CA'}, '15 Jun 2016', {'8 PM', '10 PM'}, 20, 10, 10, 10);
        this.model = new service_provider_details_1.ServiceProviderDetails();
        this.submitted = false;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
    }
    ServiceProviderComponent.prototype.onSubmit = function () {
        this.submitted = true;
        console.log(this.model);
        // fetch('http://localhost:9000/service-confirm', { method: 'POST', body: this.model })
        //     .then(function(res) {
        //         return res.json();
        //     }).then(function(json) {
        //     console.log(json);
        // });
    };
    Object.defineProperty(ServiceProviderComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () { return JSON.stringify(this.model); },
        enumerable: true,
        configurable: true
    });
    ServiceProviderComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.routeParams.get('id') !== null) {
            var id = +this.routeParams.get('id');
            this.navigated = true;
            this.serviceProviderCRUDService.getServiceProvider(id)
                .then(function (serviceProviderDetails) { return _this.serviceProviderDetails = serviceProviderDetails; });
        }
        else {
            this.navigated = false;
            this.serviceProviderDetails = new service_provider_details_1.ServiceProviderDetails();
        }
    };
    ServiceProviderComponent.prototype.save = function () {
        var _this = this;
        this.serviceProviderCRUDService
            .save(this.serviceProviderDetails)
            .then(function (serviceProviderDetails) {
            _this.serviceProviderDetails = serviceProviderDetails; // saved hero, w/ id if new
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
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
            styleUrls: ['app/service-provider/service-provider.component.css']
        }), 
        __metadata('design:paramtypes', [service_provider_crud_service_1.ServiceProviderCRUDService, router_deprecated_1.RouteParams])
    ], ServiceProviderComponent);
    return ServiceProviderComponent;
}());
exports.ServiceProviderComponent = ServiceProviderComponent;
//# sourceMappingURL=service-provider.component.js.map