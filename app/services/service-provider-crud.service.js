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
 * Created by Abhi on 6/11/16.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var ServiceProviderCRUDService = (function () {
    function ServiceProviderCRUDService(http) {
        this.http = http;
        this.serviceProvidersUrl = 'http:localhost:9000/service-confirm'; // URL to web api
    }
    ServiceProviderCRUDService.prototype.save = function (serviceProviderDetails) {
        if (serviceProviderDetails.id) {
            return this.put(serviceProviderDetails);
        }
        return this.post(serviceProviderDetails);
    };
    ServiceProviderCRUDService.prototype.getServiceProviders = function () {
        return this.http.get(this.serviceProvidersUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    ServiceProviderCRUDService.prototype.getServiceProvider = function (id) {
        return this.getServiceProviders()
            .then(function (heroes) { return heroes.filter(function (hero) { return hero.id === id; })[0]; });
    };
    ServiceProviderCRUDService.prototype.delete = function (serviceProviderDetails) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.serviceProvidersUrl + "/" + serviceProviderDetails.id;
        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    };
    // Add new serice provider
    ServiceProviderCRUDService.prototype.post = function (serviceProviderDetails) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        return this.http
            .post(this.serviceProvidersUrl, JSON.stringify(serviceProviderDetails), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update existing service provider
    ServiceProviderCRUDService.prototype.put = function (serviceProviderDetails) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.serviceProvidersUrl + "/" + serviceProviderDetails.id;
        return this.http
            .put(url, JSON.stringify(serviceProviderDetails), { headers: headers })
            .toPromise()
            .then(function () { return serviceProviderDetails; })
            .catch(this.handleError);
    };
    ServiceProviderCRUDService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ServiceProviderCRUDService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ServiceProviderCRUDService);
    return ServiceProviderCRUDService;
}());
exports.ServiceProviderCRUDService = ServiceProviderCRUDService;
//# sourceMappingURL=service-provider-crud.service.js.map