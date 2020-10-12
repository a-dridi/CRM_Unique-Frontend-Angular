import { CommunicationType } from './communicationtype';

export interface CommunicationMessage {
    communicationMessageId?: number;
    type: CommunicationType;
    message: string;
    tag1?: string;
    tag2?: string;
    tag3?: string;
    tag4?: string;
    createdDate?: string;
    updatedDate?: string;
}