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

//var fetch = require('node-fetch');


@Component({
    selector: 'service-provider',
    templateUrl: 'app/service-provider/service-provider.component.html',
    styleUrls: ['app/service-provider/service-provider.component.css'],
    providers: [ ServiceProviderCRUDService ]
})

export class ServiceProviderComponent {
    //model = new ServiceProvider('Abhilash', 'abhilash.shrivastava@hotmail.com', 2485679221, {'50 Chumasero Drive', 'Apt 4k', 'San Francisco', 'CA'}, {'50 Chumasero Drive', 'Apt 4k', 'San Francisco', 'CA'}, '15 Jun 2016', {'8 PM', '10 PM'}, 20, 10, 10, 10);
    errorMessage: string;
    mode = 'Observable';
    model = new ServiceProviderDetails();
    
    submitted = false;
    onSubmit() { this.submitted = true;
        console.log(this.model);
        this.saveServiceProviderDetails(this.model);
    }
    // TODO: Remove this when we're done
    @Input() serviceProviderDetails: ServiceProviderDetails;
    @Output() close = new EventEmitter();
    error: any;
    navigated = false; // true if navigated here

    status: string;
    constructor(
        private serviceProviderCRUDService: ServiceProviderCRUDService,
        private routeParams: RouteParams) {
    }

    saveServiceProviderDetails(serviceProviderDetails: ServiceProviderDetails){
        if (!serviceProviderDetails) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.serviceProviderCRUDService.save(serviceProviderDetails)
            .subscribe(
                data  => this.status = JSON.stringify(data),
                error =>  this.errorMessage = <any>error
            );

    }
    // ngOnInit() {
    //     if (this.routeParams.get('id') !== null) {
    //         let id = +this.routeParams.get('id');
    //         this.navigated = true;
    //         this.serviceProviderCRUDService.getServiceProvider(id)
    //             .then(serviceProviderDetails => this.serviceProviderDetails = serviceProviderDetails);
    //     } else {
    //         this.navigated = false;
    //         this.serviceProviderDetails = new ServiceProviderDetails();
    //     }
    // }
    //
    // save() {
    //     this.serviceProviderCRUDService
    //         .save(this.serviceProviderDetails)
    //         .then(serviceProviderDetails => {
    //             this.serviceProviderDetails = serviceProviderDetails; // saved hero, w/ id if new
    //         })
    //         .catch(error => this.error = error); // TODO: Display error message
    // }

}