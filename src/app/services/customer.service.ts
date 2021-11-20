import { HttpClient } from '@angular/common/http';
import { componentFactoryName } from '@angular/compiler';
import { summaryForJitFileName } from '@angular/compiler/src/aot/util';
import { Injectable } from '@angular/core';
import { ApiConfig } from '../util/api.config';

@Injectable({
  providedIn: 'root'
})
/**
 * Service Class to access Customer data from a REST API (Spring). 
 */
export class CustomerService {

  fullApiurl: string;
  uri: string = "customer";

  constructor(private httpClient: HttpClient, private apiConfig: ApiConfig) {
   this.fullApiurl = this.apiConfig.apiUrl + "/" + this.uri;
   }

  getAllCustomers() {
    return this.httpClient.get(`${this.fullApiurl}/all`);
  }

  getCustomerById(id) {
    this.httpClient
    return this.httpClient.get(`${this.fullApiurl}/get/byId/${id}`);

  }

  addCustomer(companyName, forename, surname, email, telephone, street, city, postcode, country, IBAN, BIC, bankInformation, website, facebookUrl, twitterUrl, linkedinUrl, xingUrl, socialmediaUrl, language, timezone, note, communicationMessagesArray, customerNotesArray) {
    const newCustomer = {
      companyName: companyName,
      forename: forename,
      surname: surname,
      email: email,
      telephone: telephone,
      street: street,
      city: city,
      postcode: postcode,
      country: country,
      IBAN: IBAN,
      BIC: BIC,
      bankInformation: bankInformation,
      website: website,
      facebookUrl: facebookUrl,
      twitterUrl: twitterUrl,
      linkedinUrl: linkedinUrl,
      xingUrl: xingUrl,
      socialmediaUrl: socialmediaUrl,
      language: language,
      timezone: timezone,
      note: note
    };
    return this.httpClient.post(`${this.fullApiurl}/add`, newCustomer);
  }

  updateCustomer(id, companyName, forename, surname, email, telephone, street, city, postcode, country, IBAN, BIC, bankInformation, website, facebookUrl, twitterUrl, linkedinUrl, xingUrl, socialmediaUrl, language, timezone, note, communicationMessagesArray, customerNotesArray) {
    const updatedCustomer = {
      _id: id,
      companyName: companyName,
      forename: forename,
      surname: surname,
      email: email,
      telephone: telephone,
      street: street,
      city: city,
      postcode: postcode,
      country: country,
      IBAN: IBAN,
      BIC: BIC,
      bankInformation: bankInformation,
      website: website,
      facebookUrl: facebookUrl,
      twitterUrl: twitterUrl,
      linkedinUrl: linkedinUrl,
      xingUrl: xingUrl,
      socialmediaUrl: socialmediaUrl,
      language: language,
      timezone: timezone,
      note: note
    };
    return this.httpClient.put(`${this.fullApiurl}/update`, updatedCustomer);
  }

  deleteCustomer(id) {
    return this.httpClient.delete(`${this.fullApiurl}/delete/byId/${id}`);
  }

}
