import { CommunicationMessage } from './communicationmessage.model';
import { CustomerNote } from './customernote';

export interface Customer {
    _id: string;
    companyName: string;
    forename: string;
    surname: string;
    email: string;
    telephone: number;
    street: string;
    city: string;
    postCode: number;
    country: string;
    IBAN: string;
    BIC: string;
    bankInformation: string;
    website: string;
    facebookUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
    xingUrl: string;
    socialmediaUrl: string;
    language: string;
    timezone: string;
    note: string;
    communicationMessageList: CommunicationMessage[];
    customerNoteList: CustomerNote[];
    deleted: boolean;
}