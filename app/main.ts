// Imports for loading & configuring the in-memory web api
import {bind, provide} from '@angular/core';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';


// The usual bootstrapping imports
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }   from './app.component';
import {GoogleApiService} from "./services/googleAPIService.service";

//noinspection TypeScriptValidateTypes
bootstrap(AppComponent, [
    GoogleApiService,
    HTTP_PROVIDERS,
    provide(AuthConfig, { useFactory: () => {
        return new AuthConfig();
    }}),
    AuthHttp,
    bind(LocationStrategy).toClass(HashLocationStrategy),
]);
