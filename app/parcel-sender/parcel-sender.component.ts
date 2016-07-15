/**
 * Created by Abhi on 6/11/16.
 */

import {tokenNotExpired} from 'angular2-jwt';
import {ParcelSenderDetails} from "../services/parcel-sender-details";
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';
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
    profile:any;
    data:any;
    currentCityName: string[];
    deliveryCityName: string[];
    states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

    submitted = false;
    onSubmit() { this.submitted = true;
        if (this.profile["id"] != null){
            this.model["_id"] = this.profile.id;
            this.router.navigate( ['Profile'] );
        }
        this.model['senderEmail'] = this.profile.email;
        this.currentCityName = this.model['currentCity'].split(" ");
        this.model['currentCity'] = "";
        for (var i= 0 ; i < this.currentCityName.length; i++ ){
            this.currentCityName[i] = this.currentCityName[i].charAt(0).toUpperCase() + this.currentCityName[i].slice(1).toLowerCase();
            this.model['currentCity'] =  this.model['currentCity'] + this.currentCityName[i]
            if (i + 1 < this.currentCityName.length ){
                this.model['currentCity'] =  this.model['currentCity'] + " ";
            }
        }
        this.deliveryCityName = this.model['deliveryCity'].split(" ");
        this.model['deliveryCity'] = "";
        for (var i= 0 ; i < this.deliveryCityName.length; i++ ){
            this.deliveryCityName[i] = this.deliveryCityName[i].charAt(0).toUpperCase() + this.deliveryCityName[i].slice(1).toLowerCase();
            this.model['deliveryCity'] =  this.model['deliveryCity'] + this.deliveryCityName[i]
            if (i + 1 < this.deliveryCityName.length ){
                this.model['deliveryCity'] =  this.model['deliveryCity'] + " ";
            }
        }
        if (this.model !== null){
            this.saveParcelSenderDetails(this.model);
        }        
    }
    error: any;

    status: string;
    constructor( private router: Router,
        private parcelSenderCRUDService: ParcelSenderCRUDService,
        private routeParams: RouteParams) {
    }

    ngOnInit(): void {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        let id = this.routeParams.get('id');
        if (id != null){
            this.profile["id"] = id;
            this.model["_id"] = id;
        }
        this.getParcelSenderDetails(this.profile);
    }
    
    saveParcelSenderDetails(parcelSenderDetails: ParcelSenderDetails){
        if (!parcelSenderDetails) { return; }
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        this.parcelSenderCRUDService.save(parcelSenderDetails)
            .subscribe(
                data  => {
                    this.requests = data;
                    if(this.requests.length > 0){
                        this.showDetails = true;
                    }else{
                        this.showDetails = false;
                    }
                },
                error =>  this.errorMessage = <any>error
            );

    }

    getParcelSenderDetails(data){
        if (!this.profile.email) { return; }
        //noinspection TypeScriptUnresolvedFunction
        this.parcelSenderCRUDService.getParcelSenderDetails(data)
            .subscribe(
                data  => {
                    this.data = data;
                    delete this.data[0]['status'];
                    delete this.data[0]['_id'];
                    this.model = this.data[0];
                },
                error =>  this.errorMessage = <any>error
            );

    }

    onChange(selectedState) {
        // this.SwitchFuction(selectedState);
    }
    
    loggedIn() {
        return tokenNotExpired();
    }
}