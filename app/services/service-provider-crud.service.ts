/**
 * Created by Abhi on 6/11/16.
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ServiceProviderDetails } from './service-provider-details';

@Injectable()
export class ServiceProviderCRUDService{

    private serviceProvidersUrl = 'app/services';  // URL to web api
    constructor(private http: Http) { }

    save(serviceProviderDetails: ServiceProviderDetails): Promise<ServiceProviderDetails>  {
        if (serviceProviderDetails.id) {
            return this.put(serviceProviderDetails);
        }
        return this.post(serviceProviderDetails);
    }

    getServiceProviders(): Promise<ServiceProviderDetails[]> {
        return this.http.get(this.serviceProvidersUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    getServiceProvider(id: number) {
        return this.getServiceProviders()
            .then(heroes => heroes.filter(hero => hero.id === id)[0]);
    }
    
    delete(serviceProviderDetails: ServiceProviderDetails) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.serviceProvidersUrl}/${serviceProviderDetails.id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    // Add new serice provider
    private post(serviceProviderDetails: ServiceProviderDetails): Promise<ServiceProviderDetails> {
        let headers = new Headers({
            'Content-Type': 'application/json'});

        return this.http
            .post(this.serviceProvidersUrl, JSON.stringify(serviceProviderDetails), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    // Update existing service provider
    private put(serviceProviderDetails: ServiceProviderDetails) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.serviceProvidersUrl}/${serviceProviderDetails.id}`;

        return this.http
            .put(url, JSON.stringify(serviceProviderDetails), {headers: headers})
            .toPromise()
            .then(() => serviceProviderDetails)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}