/**
 * Created by Abhi on 6/11/16.
 */

import { NgForm }    from '@angular/common';
import { Router } from '@angular/router-deprecated';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
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
    errorMessage: string;
    requests: any;
    mode = 'Observable';
    model = new ServiceProviderDetails();
    showDetails = false;


    submitted = false;
    onSubmit() { this.submitted = true;
        if (this.model !== null){
            this.saveServiceProviderDetails(this.model);
        }
    }
    error: any;
    status: string;
    constructor(
        private serviceProviderCRUDService: ServiceProviderCRUDService,
        private routeParams: RouteParams) {
    }

    saveServiceProviderDetails(serviceProviderDetails: ServiceProviderDetails){
        if (!serviceProviderDetails) { return; }
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        this.serviceProviderCRUDService.save(serviceProviderDetails)
            .subscribe(
                data  => {
                    console.log(data);
                    this.requests = data;
                    console.log(this.requests);
                    if(this.requests.length > 0){
                        this.showDetails = true;
                    }else{
                        this.showDetails = false;
                    }
                },
                error =>  this.errorMessage = <any>error
            );

    }

    loggedIn() {
        return tokenNotExpired();
    }
}