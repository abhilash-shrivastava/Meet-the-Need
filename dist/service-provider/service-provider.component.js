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
var router_deprecated_1 = require('@angular/router-deprecated');
var core_1 = require('@angular/core');
var service_provider_details_1 = require('./../services/service-provider-details');
var service_provider_crud_service_1 = require('./../services/service-provider-crud.service');
require('./../rxjs-operators');
var angular2_jwt_1 = require('angular2-jwt');
//var fetch = require('node-fetch');
var ServiceProviderComponent = (function () {
    function ServiceProviderComponent(router, serviceProviderCRUDService, routeParams) {
        this.router = router;
        this.serviceProviderCRUDService = serviceProviderCRUDService;
        this.routeParams = routeParams;
        this.mode = 'Observable';
        this.model = new service_provider_details_1.ServiceProviderDetails();
        this.showDetails = false;
        this.isLoading = false;
        this.submitted = false;
        this.states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
        this.cities = [];
        this.SwitchFuction = function (state) {
            switch (state) {
                case 'Alabama':
                    this.cities = ["Alabama cities"];
                    break;
                case 'Alaska':
                    this.cities = ["Alaska cities"];
                    break;
                default: this.cities = [];
            }
        };
    }
    ServiceProviderComponent.prototype.onSubmit = function () {
        this.isLoading = true;
        this.submitted = true;
        if (this.profile["id"] != null) {
            this.model["_id"] = this.profile.id;
        }
        this.model['email'] = this.profile.email;
        this.currentCityName = this.model['currentCity'].split(" ");
        this.model['currentCity'] = "";
        for (var i = 0; i < this.currentCityName.length; i++) {
            this.currentCityName[i] = this.currentCityName[i].charAt(0).toUpperCase() + this.currentCityName[i].slice(1).toLowerCase();
            this.model['currentCity'] = this.model['currentCity'] + this.currentCityName[i];
            if (i + 1 < this.currentCityName.length) {
                this.model['currentCity'] = this.model['currentCity'] + " ";
            }
        }
        this.destinationCityName = this.model['destinationCity'].split(" ");
        this.model['destinationCity'] = "";
        for (var i = 0; i < this.destinationCityName.length; i++) {
            this.destinationCityName[i] = this.destinationCityName[i].charAt(0).toUpperCase() + this.destinationCityName[i].slice(1).toLowerCase();
            this.model['destinationCity'] = this.model['destinationCity'] + this.destinationCityName[i];
            if (i + 1 < this.destinationCityName.length) {
                this.model['destinationCity'] = this.model['destinationCity'] + " ";
            }
        }
        if (this.model !== null) {
            this.saveServiceProviderDetails(this.model);
        }
    };
    ServiceProviderComponent.prototype.ngOnInit = function () {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        var id = this.routeParams.get('id');
        if (id != null) {
            this.profile["id"] = id;
            this.model["_id"] = id;
        }
        this.getServiceProviderDetails(this.profile);
    };
    ServiceProviderComponent.prototype.saveServiceProviderDetails = function (serviceProviderDetails) {
        var _this = this;
        if (!serviceProviderDetails) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        this.serviceProviderCRUDService.save(serviceProviderDetails)
            .subscribe(function (data) {
            _this.requests = data;
            setTimeout(function () {
                _this.isLoading = false;
            }, 3000);
            if (_this.requests.length > 0) {
                _this.showDetails = true;
            }
            else {
                if (_this.profile["id"] != null) {
                    _this.router.navigate(['Profile']);
                }
                _this.showDetails = false;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    ServiceProviderComponent.prototype.getServiceProviderDetails = function (data) {
        var _this = this;
        if (!this.profile.email) {
            return;
        }
        //noinspection TypeScriptUnresolvedFunction
        this.serviceProviderCRUDService.getServiceProviderDetails(data)
            .subscribe(function (data) {
            _this.data = data;
            if (_this.data[0].serviceProvider) {
                delete _this.data[0].serviceProvider['_id'];
                _this.model = _this.data[0].serviceProvider;
            }
            else {
                delete _this.data[0]['_id'];
                _this.model = _this.data[0];
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    ServiceProviderComponent.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    ServiceProviderComponent.prototype.onChange = function (selectedState) {
        // this.SwitchFuction(selectedState);
    };
    ServiceProviderComponent = __decorate([
        core_1.Component({
            selector: 'service-provider',
            templateUrl: 'app/service-provider/service-provider.component.html',
            styleUrls: ['app/service-provider/service-provider.component.css'],
            providers: [service_provider_crud_service_1.ServiceProviderCRUDService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, service_provider_crud_service_1.ServiceProviderCRUDService, router_deprecated_1.RouteParams])
    ], ServiceProviderComponent);
    return ServiceProviderComponent;
}());
exports.ServiceProviderComponent = ServiceProviderComponent;
//# sourceMappingURL=service-provider.component.js.map