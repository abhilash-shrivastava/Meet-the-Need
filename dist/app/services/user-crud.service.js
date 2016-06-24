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
/**
 * Created by Abhi on 6/11/16.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var Observable_1 = require('rxjs/Observable');
var UserCRUDService = (function () {
    function UserCRUDService(http) {
        this.http = http;
        this.userDetailsSaveUrl = 'http://localhost:9000/save-user';
    }
    UserCRUDService.prototype.save = function (userDetails) {
        //console.log(serviceProviderDetails);
        var body = JSON.stringify(userDetails);
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem('id_token') + '' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.userDetailsSaveUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserCRUDService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    UserCRUDService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserCRUDService);
    return UserCRUDService;
}());
exports.UserCRUDService = UserCRUDService;
//# sourceMappingURL=user-crud.service.js.map