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
import {GoogleApiService} from "../services/googleAPIService.service";


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
    fetchingCurrentAddress = false;
    isCurrentAddressLoading = false;

    placeSearch: any;
    autocomplete: any;
    componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

    onSubmit() {
        this.isLoading = true;
        this.submitted = true;
        if (this.profile["id"] != null){
            this.model["_id"] = this.profile.id;
        }
        this.model['email'] = this.profile.email;
        // this.currentCityName = this.model['currentCity'].split(" ");
        // this.model['currentCity'] = "";
        // for (var i= 0 ; i < this.currentCityName.length; i++ ){
        //     this.currentCityName[i] = this.currentCityName[i].charAt(0).toUpperCase() + this.currentCityName[i].slice(1).toLowerCase();
        //     this.model['currentCity'] =  this.model['currentCity'] + this.currentCityName[i]
        //     if (i + 1 < this.currentCityName.length ){
        //         this.model['currentCity'] =  this.model['currentCity'] + " ";
        //     }
        // }
        // this.destinationCityName = this.model['destinationCity'].split(" ");
        // this.model['destinationCity'] = "";
        // for (var i= 0 ; i < this.destinationCityName.length; i++ ){
        //     this.destinationCityName[i] = this.destinationCityName[i].charAt(0).toUpperCase() + this.destinationCityName[i].slice(1).toLowerCase();
        //     this.model['destinationCity'] =  this.model['destinationCity'] + this.destinationCityName[i];
        //     if (i + 1 < this.destinationCityName.length ){
        //         this.model['destinationCity'] =  this.model['destinationCity'] + " ";
        //     }
        // }
        if (this.model !== null){
            this.saveServiceProviderDetails(this.model);
        }
    }
    error: any;
    status: string;
    constructor(private router: Router,
                private googleApi:GoogleApiService,
        private serviceProviderCRUDService: ServiceProviderCRUDService,
        private routeParams: RouteParams) {
    }

    ngOnInit(): void {

        this.googleApi.initAutocomplete().then(() => {
            // Create the autocomplete object, restricting the search to geographical
            // location types.
            this.autocomplete = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */(<HTMLInputElement>document.getElementById('autocomplete')),
                {types: ['geocode']});
        });
        
        this.profile = JSON.parse(localStorage.getItem('profile'));
        let id = this.routeParams.get('id');
        if (id != null){
            this.profile["id"] = id;
            this.model["_id"] = id;
        }
        this.getServiceProviderDetails(this.profile);
    }

    
    fillInAddress() {
        // Get the place details from the autocomplete object.
        let place = this.autocomplete.getPlace();

        this.model['currentAddreddaddressLine1'] = "";
        this.model['currentAddressaddressLine2'] = "";
        this.model['currentCity'] = "";
        this.model['currentState'] ="";
        this.model['currentZip'] = "";

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (let i = 0; i < place.address_components.length; i++) {
            let addressType = place.address_components[i].types[0];
            if (this.componentForm[addressType]) {
                let val = place.address_components[i][this.componentForm[addressType]];
                if (addressType == 'street_number'){
                    this.model['currentAddreddaddressLine1'] = val;
                }else if (addressType == 'route'){
                    this.model['currentAddressaddressLine2'] = val;
                }else if (addressType == 'locality'){
                    this.model['currentCity'] = val;
                }else if (addressType == 'administrative_area_level_1') {
                    this.model['currentState'] =val;
                }else if (addressType == 'postal_code'){
                    this.model['currentZip'] = val;
                }
            }
        }
        if (place.address_components.length > 0){
            setTimeout(() => {
                this.isCurrentAddressLoading = false;
                this.fetchingCurrentAddress = true;
                place['address_components'] = null;
            }, 1);
        }
    }
    circle: any;
    geolocate(event : any) {
        this.isCurrentAddressLoading = true;
        this.fetchingCurrentAddress = false;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                //noinspection TypeScriptValidateTypes
                this.circle = new google.maps.Circle();
                this.autocomplete.setBounds(this.circle.getBounds());
                this.fillInAddress();
            });
        }
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