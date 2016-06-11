/**
 * Created by Abhi on 6/8/16.
 */

import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {ServiceProviderComponent} from "./service-provider/service-provider.component";
import {ParcelSenderComponent} from "./parcel-sender/parcel-sender.component";
import { ServiceProviderCRUDService }         from './services/service-provider-crud.service';


@Component({
    selector: 'my-app',
    template: `
                <h1>{{title}}</h1>
                <nav>
                <a [routerLink]="['ServiceProvider']">Service Provider</a>
                <a [routerLink]="['ParcelSender']">Parcel Sender</a>
                </nav>
                <router-outlet></router-outlet>        `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        ServiceProviderCRUDService
    ]

})
//noinspection TypeScriptValidateTypes
@RouteConfig([
    {
        path: '/service-provider',
        name: 'ServiceProvider',
        component: ServiceProviderComponent
    },
    {
        path: '/parcel-sender',
        name: 'ParcelSender',
        component: ParcelSenderComponent
    }
])

export class AppComponent {
    title = 'Meet The Need'
}
