import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from '../util/api.config';

@Injectable({
  providedIn: 'root'
})
export class CommunicationMessageService {

  fullApiurl: string;
  uri: string = "communicationMessage";

  constructor(private httpClient: HttpClient, private apiConfig: ApiConfig) {
    this.fullApiurl = this.apiConfig.apiUrl + "/" + this.uri;
  }

  getAllCommunicationMessage(customerId: string) {
    return this.httpClient.get(`${this.fullApiurl}/all/`+customerId);
  }

  getCommunicationMessageById(id) {
    return this.httpClient.get(`${this.fullApiurl}/get/byid/${id}`);
  }

  addCommunicationMessage(customerId, communicationType, message, tag1, tag2, tag3, tag4, tag5) {
    const newCommunicationMessage = {
      customerId: customerId,
      communicationType: communicationType,
      message: message,
      tag1: tag1,
      tag2: tag2,
      tag3: tag3,
      tag4: tag4,
      tag5: tag5
    };
    return this.httpClient.post(`${this.fullApiurl}/add`, newCommunicationMessage);
  }

  updateCommunicationMessage(id, customerId, communicationType, message, tag1, tag2, tag3, tag4, tag5) {
    const updatedCommunicationMessage = {
      _id: id,
      customerId: customerId,
      communicationType: communicationType,
      message: message,
      tag1: tag1,
      tag2: tag2,
      tag3: tag3,
      tag4: tag4,
      tag5: tag5
    };
    return this.httpClient.put(`${this.fullApiurl}/update`, updatedCommunicationMessage);
  }

  deleteCommunicationMessage(id) {
    return this.httpClient.delete(`${this.fullApiurl}/delete/${id}`);
  }

}
