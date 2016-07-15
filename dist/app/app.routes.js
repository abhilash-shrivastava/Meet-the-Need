define(["require", "exports", '@angular/router', "./service-provider/service-provider.component", "./profile/profile.component", "./parcel-sender/parcel-sender.component"], function (require, exports, router_1, service_provider_component_1, profile_component_1, parcel_sender_component_1) {
    "use strict";
    exports.routes = [
        { path: '', component: 'profile' },
        {
            path: 'profile',
            component: profile_component_1.ProfileComponent
        },
        {
            path: 'service-provider',
            component: service_provider_component_1.ServiceProviderComponent
        },
        {
            path: 'parcel-sender',
            component: parcel_sender_component_1.ParcelSenderComponent
        }];
    exports.appRouterProviders = [
        router_1.provideRouter(exports.routes)
    ];
});
//# sourceMappingURL=app.routes.js.map