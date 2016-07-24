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
 * Created by Abhi on 7/23/16.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXd8KlVO4CH52NrFf1yrWQEbPJAd0Zjg4&libraries=places&callback=initAutocomplete";
var GoogleApiService = (function () {
    function GoogleApiService(http) {
        var _this = this;
        this.http = http;
        this.loadMap = new Promise(function (resolve) {
            window['initAutocomplete'] = function () {
                resolve();
            };
            _this.loadScript();
        });
    }
    GoogleApiService.prototype.initAutocomplete = function () {
        return this.loadMap;
    };
    GoogleApiService.prototype.loadScript = function () {
        var script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        if (document.body.contains(script)) {
            return;
        }
        document.getElementsByTagName('head')[0].appendChild(script);
    };
    GoogleApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GoogleApiService);
    return GoogleApiService;
}());
exports.GoogleApiService = GoogleApiService;
//# sourceMappingURL=googleAPIService.service.js.map