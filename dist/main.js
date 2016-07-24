"use strict";
// Imports for loading & configuring the in-memory web api
var core_1 = require('@angular/core');
var angular2_jwt_1 = require('angular2-jwt');
var common_1 = require('@angular/common');
// The usual bootstrapping imports
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var googleAPIService_service_1 = require("./services/googleAPIService.service");
//noinspection TypeScriptValidateTypes
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    googleAPIService_service_1.GoogleApiService,
    http_1.HTTP_PROVIDERS,
    core_1.provide(angular2_jwt_1.AuthConfig, { useFactory: function () {
            return new angular2_jwt_1.AuthConfig();
        } }),
    angular2_jwt_1.AuthHttp,
    core_1.bind(common_1.LocationStrategy).toClass(common_1.HashLocationStrategy),
]);
//# sourceMappingURL=main.js.map