/**
 * Created by Abhi on 6/11/16.
 */
export class ServiceProviderDetails{
    id: number;
    name: string;
    email: string;
    phone: number;
    currentAddress: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        zip: number;
    };
    destinationAddress: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        zip: number;
    };
    journeyDate: string;
    availabiliyTime: {
        from: string;
        to: string;
    };
    maxParcelWeigth: number;
    maxParcelHeight: number;
    maxParcelLength: number;
    maxParcelWidth: number;
}