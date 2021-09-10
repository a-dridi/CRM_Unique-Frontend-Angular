import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from '../util/api.config';

@Injectable({
  providedIn: 'root'
})
export class CustomerNoteService {

  fullApiurl: string;
  uri: string = "customerNote";

  constructor(private httpClient: HttpClient, private apiConfig: ApiConfig) {
    this.fullApiurl = this.apiConfig.apiUrl + "/" + this.uri;
  }

  getAllCustomerNote(customerId: string) {
    return this.httpClient.get(`${this.fullApiurl}/all/`+customerId);
  }

  getCustomerNoteById(id) {
    return this.httpClient.get(`${this.fullApiurl}/get/byid/${id}`);
  }

  addCustomerNote(customerId, title, description, attachmentLink) {
    const newCustomerNote = {
      customerId: customerId,
      title: title,
      description: description,
      attachmentLink: attachmentLink
    };
    return this.httpClient.post(`${this.fullApiurl}/add`, newCustomerNote);
  }

  updateCustomerNote(id, customerId, title, description, attachmentLink) {
    const updatedCustomerNote = {
      _id: id,
      customerId: customerId,
      title: title,
      description: description,
      attachmentLink: attachmentLink
    };
    return this.httpClient.put(`${this.fullApiurl}/update`, updatedCustomerNote);
  }

  deleteCustomerNote(id) {
    return this.httpClient.delete(`${this.fullApiurl}/delete/${id}`);
  }

}
