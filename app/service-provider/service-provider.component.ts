/**
 * Created by Abhi on 6/11/16.
 */

import { Router } from '@angular/router-deprecated';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { ServiceProviderDetails }        from './../services/service-provider-details';
import { ServiceProviderCRUDService } from './../services/service-provider-crud.service';

@Component({
    selector: 'service-provider',
    templateUrl: 'app/service-provider/service-provider.component.html',
    styleUrls: ['app/service-provider/service-provider.component.css'],
    providers: [ServiceProviderCRUDService]

})

export class ServiceProviderComponent {
    @Input() serviceProviderDetails: ServiceProviderDetails;
    @Output() close = new EventEmitter();
    error: any;
    navigated = false; // true if navigated here

    constructor(
        private serviceProviderCRUDService: ServiceProviderCRUDService,
        private routeParams: RouteParams) {
    }
    ngOnInit() {
        if (this.routeParams.get('id') !== null) {
            let id = +this.routeParams.get('id');
            this.navigated = true;
            this.serviceProviderCRUDService.getServiceProvider(id)
                .then(serviceProviderDetails => this.serviceProviderDetails = serviceProviderDetails);
        } else {
            this.navigated = false;
            this.serviceProviderDetails = new ServiceProviderDetails();
        }
    }

    save() {
        this.serviceProviderCRUDService
            .save(this.serviceProviderDetails)
            .then(serviceProviderDetails => {
                this.serviceProviderDetails = serviceProviderDetails; // saved hero, w/ id if new
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

}