/**
 * Created by Abhi on 6/11/16.
 */

import { NgForm }    from '@angular/common';
import { RouteParams, Router } from '@angular/router-deprecated';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceProviderDetails }        from './../services/service-provider-details';
import { ServiceProviderCRUDService } from './../services/service-provider-crud.service';
import './../rxjs-operators';
import {tokenNotExpired} from 'angular2-jwt';


//var fetch = require('node-fetch');


@Component({
    selector: 'service-provider',
    templateUrl: 'app/service-provider/service-provider.component.html',
    styleUrls: ['app/service-provider/service-provider.component.css'],
    providers: [ ServiceProviderCRUDService ]
})

export class ServiceProviderComponent {
    profile: any;
    errorMessage: string;
    requests: any;
    mode = 'Observable';
    model = new ServiceProviderDetails();
    data: any;
    showDetails = false;
    currentCityName: string[];
    destinationCityName: string[];
    isLoading = false;
    submitted = false;

    onSubmit() {
        this.isLoading = true;
        this.submitted = true;
        if (this.profile["id"] != null){
            this.model["_id"] = this.profile.id;
        }
        this.model['email'] = this.profile.email;
        this.currentCityName = this.model['currentCity'].split(" ");
        this.model['currentCity'] = "";
        for (var i= 0 ; i < this.currentCityName.length; i++ ){
            this.currentCityName[i] = this.currentCityName[i].charAt(0).toUpperCase() + this.currentCityName[i].slice(1).toLowerCase();
            this.model['currentCity'] =  this.model['currentCity'] + this.currentCityName[i]
            if (i + 1 < this.currentCityName.length ){
                this.model['currentCity'] =  this.model['currentCity'] + " ";
            }
        }
        this.destinationCityName = this.model['destinationCity'].split(" ");
        this.model['destinationCity'] = "";
        for (var i= 0 ; i < this.destinationCityName.length; i++ ){
            this.destinationCityName[i] = this.destinationCityName[i].charAt(0).toUpperCase() + this.destinationCityName[i].slice(1).toLowerCase();
            this.model['destinationCity'] =  this.model['destinationCity'] + this.destinationCityName[i]
            if (i + 1 < this.destinationCityName.length ){
                this.model['destinationCity'] =  this.model['destinationCity'] + " ";
            }
        }
        if (this.model !== null){
            this.saveServiceProviderDetails(this.model);
        }
    }
    error: any;
    status: string;
    constructor(private router: Router,
        private serviceProviderCRUDService: ServiceProviderCRUDService,
        private routeParams: RouteParams) {
    }

    ngOnInit(): void {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        let id = this.routeParams.get('id');
        if (id != null){
            this.profile["id"] = id;
            this.model["_id"] = id;
        }
        this.getServiceProviderDetails(this.profile);
    }

    saveServiceProviderDetails(serviceProviderDetails: ServiceProviderDetails){
        if (!serviceProviderDetails) { return; }
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        this.serviceProviderCRUDService.save(serviceProviderDetails)
            .subscribe(
                data  => {
                    this.requests = data;
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 3000);
                    if(this.requests.length > 0){
                        this.showDetails = true;
                    }else{
                        if (this.profile["id"] != null){
                            this.router.navigate( ['Profile'] );
                        }
                        this.showDetails = false;
                    }
                },
                error =>  this.errorMessage = <any>error
            );

    }

    getServiceProviderDetails(data){
        if (!this.profile.email) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.serviceProviderCRUDService.getServiceProviderDetails(data)
            .subscribe(
                data  => {
                    this.data = data;
                    if (this.data[0].serviceProvider){
                        delete this.data[0].serviceProvider['_id']
                        this.model = this.data[0].serviceProvider;
                    }else {
                        delete this.data[0]['_id']
                        this.model = this.data[0];
                    }
                },
                error =>  this.errorMessage = <any>error
            );

    }

    loggedIn() {
        return tokenNotExpired();
    }

    onChange(selectedState) {
        // this.SwitchFuction(selectedState);
    }

    states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
    cities = [];

    SwitchFuction = function (state) {
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