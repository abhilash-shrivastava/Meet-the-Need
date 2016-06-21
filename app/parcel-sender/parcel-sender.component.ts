/**
 * Created by Abhi on 6/11/16.
 */

import {tokenNotExpired} from 'angular2-jwt';
import {ParcelSenderDetails} from "../services/parcel-sender-details";
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { ParcelSenderCRUDService } from './../services/parcel-sender-crud.service';


@Component({
    selector: 'parcel-sender',
    templateUrl: 'app/parcel-sender/parcel-sender.component.html',
    styleUrls: ['app/parcel-sender/parcel-sender.component.css'],
    providers: [ ParcelSenderCRUDService ]
})

export class ParcelSenderComponent {
    errorMessage: string;
    message: any;
    mode = 'Observable';
    model = new ParcelSenderDetails();

    submitted = false;
    onSubmit() { this.submitted = true;
        console.log(this.model);
        this.saveParcelSenderDetails(this.model);
    }
    // TODO: Remove this when we're done
    @Input() parcelSenderDetails: ParcelSenderDetails;
    @Output() close = new EventEmitter();
    error: any;
    navigated = false; // true if navigated here

    status: string;
    constructor(
        private parcelSenderCRUDService: ParcelSenderCRUDService,
        private routeParams: RouteParams) {
    }

    saveParcelSenderDetails(parcelSenderDetails: ParcelSenderDetails){
        if (!parcelSenderDetails) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.parcelSenderCRUDService.save(parcelSenderDetails)
            .subscribe(
                data  => this.message = JSON.stringify(data),
                error =>  this.errorMessage = <any>error
            );

    }
    loggedIn() {
        return tokenNotExpired();
    }
}