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
 * Created by Abhi on 6/23/16.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var Observable_1 = require('rxjs/Observable');
var RequestsService = (function () {
    function RequestsService(http) {
        this.http = http;
        this.getAssignedServiceRequestsUrl = 'http://localhost:9000/assigned-service-request';
        this.getUnassignedServiceRequestsUrl = 'http://localhost:9000/unassigned-service-request';
        this.getAssignedSenderRequestsUrl = 'http://localhost:9000/assigned-sender-request';
        this.getUnassignedSenderRequestsUrl = 'http://localhost:9000/unassigned-sender-request';
        this.getParcelReceivingRequestsUrl = 'http://localhost:9000/parcel-receiving-request';
        this.setParcelStatusUrl = 'http://localhost:9000/change-status';
        this.cancelRequestUrl = 'http://localhost:9000/cancel-request';
        this.updateRequestUrl = 'http://localhost:9000/update-request';
        this.rejectRequestUrl = 'http://localhost:9000/reject-request';
    }
    RequestsService.prototype.getAssignedServiceRequests = function (data) {
        //console.log(serviceProviderDetails);
        var body = JSON.stringify(data);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem('id_token') + '' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.getAssignedServiceRequestsUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    RequestsService.prototype.getUnassignedServiceRequests = function (data) {
        //console.log(serviceProviderDetails);
        var body = JSON.stringify(data);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem('id_token') + '' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.getUnassignedServiceRequestsUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    RequestsService.prototype.getAssignedSenderRequests = function (data) {
        //console.log(serviceProviderDetails);
        var body = JSON.stringify(data);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem('id_token') + '' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.getAssignedSenderRequestsUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    RequestsService.prototype.getUnassignedSenderRequests = function (data) {
        //console.log(serviceProviderDetails);
        var body = JSON.stringify(data);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem('id_token') + '' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.getUnassignedSenderRequestsUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    RequestsService.prototype.getParcelReceivingRequests = function (data) {
        //console.log(serviceProviderDetails);
        var body = JSON.stringify(data);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem('id_token') + '' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.getParcelReceivingRequestsUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    RequestsService.prototype.setParcelStatus = function (data) {
        //console.log(serviceProviderDetails);
        var body = JSON.stringify(data);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem('id_token') + '' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.setParcelStatusUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    RequestsService.prototype.cancelRequest = function (data) {
        //console.log(serviceProviderDetails);
        var body = JSON.stringify(data);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem('id_token') + '' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.cancelRequestUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    RequestsService.prototype.updateRequest = function (data) {
        //console.log(serviceProviderDetails);
        var body = JSON.stringify(data);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem('id_token') + '' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.updateRequestUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    RequestsService.prototype.rejectRequest = function (data) {
        //console.log(serviceProviderDetails);
        var body = JSON.stringify(data);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem('id_token') + '' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.rejectRequestUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    RequestsService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    RequestsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RequestsService);
    return RequestsService;
}());
exports.RequestsService = RequestsService;
//# sourceMappingURL=request.service.js.map