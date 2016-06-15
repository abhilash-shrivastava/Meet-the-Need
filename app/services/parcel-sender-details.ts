/**
 * Created by Abhi on 6/14/16.
 */
export class ParcelSenderDetails{
    id: number;
    senderName: string;
    senderEmail: string;
    senderPhone: number;
    receiverName: string;
    receiverEmail: string;
    receiverPhone: number;
    currentAddress: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        zip: number;
    };
    deliveryAddress: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        zip: number;
    };
    parcelWeigth: number;
    parcelHeight: number;
    parcelLength: number;
    parcelWidth: number;
}