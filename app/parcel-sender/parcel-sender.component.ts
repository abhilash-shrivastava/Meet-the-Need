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
    mode = 'Observable';
    model = new ParcelSenderDetails();
    requests: any;
    showDetails = false;


    submitted = false;
    onSubmit() { this.submitted = true;
        if (this.model !== null){
            this.saveParcelSenderDetails(this.model);
        }        
    }
    error: any;

    status: string;
    constructor(
        private parcelSenderCRUDService: ParcelSenderCRUDService,
        private routeParams: RouteParams) {
    }

    saveParcelSenderDetails(parcelSenderDetails: ParcelSenderDetails){
        if (!parcelSenderDetails) { return; }
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        this.parcelSenderCRUDService.save(parcelSenderDetails)
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