import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from '../util/api.config';

@Injectable({
  providedIn: 'root'
})
/**
 * Service Class to access CommunicationType data from a REST API (Spring). 
 */
export class CommunicationTypeService {

  fullApiurl: string;
  uri: string = "communicationType";

  constructor(private httpClient: HttpClient, private apiConfig: ApiConfig) {
    this.fullApiurl = this.apiConfig.apiUrl + "/" + this.uri;
  }

  getAllCommunicationType() {
    return this.httpClient.get(`${this.fullApiurl}/all`);
  }

  getCommunicationTypeById(id) {
    return this.httpClient.get(`${this.fullApiurl}/get/byid/${id}`);
  }

  addCommunicationType(title, colorHex) {
    const newCommunicationType = {
      title: title,
      colorHex: colorHex
    };
    return this.httpClient.post(`${this.fullApiurl}/add`, newCommunicationType);
  }

  updateCommunicationType(id, title, colorHex) {
    const updatedCommunicationType = {
      _id: id,
      title: title,
      colorHex: colorHex
    };
    return this.httpClient.put(`${this.fullApiurl}/update`, updatedCommunicationType);
  }

  deleteCommunicationType(id) {
    return this.httpClient.delete(`${this.fullApiurl}/delete/${id}`);
  }

}
