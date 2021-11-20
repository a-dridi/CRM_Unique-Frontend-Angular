import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from '../util/api.config';

@Injectable({
  providedIn: 'root'
})
export class MailReminderService {

  fullApiurl: string;
  uri: string = "mailReminder";

  constructor(private httpClient: HttpClient, private apiConfig: ApiConfig) {
    this.fullApiurl = this.apiConfig.apiUrl + "/" + this.uri;
  }

  getAllMailReminders(customerId) {
    return this.httpClient.get(`${this.fullApiurl}/all/${customerId}`);
  }

  getMailReminderById(id) {
    return this.httpClient.get(`${this.fullApiurl}/get/byid/${id}`);
  }

  addMailReminder(customerId, customerName, customerEmail, reminderTitle, reminderText, reminderDate) {
    const ewMailReminder = {
      customerId: customerId,
      customerName: customerName,
      customerEmail: customerEmail,
      reminderTitle: reminderTitle,
      reminderText: reminderText,
      reminderDate: reminderDate
    };
    return this.httpClient.post(`${this.fullApiurl}/create`, ewMailReminder);
  }

}
