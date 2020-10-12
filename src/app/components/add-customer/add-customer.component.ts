import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { CommunicationType } from 'src/app/model/communicationtype';
import { CommunicationTypeService } from 'src/app/services/communicationtype.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Countries } from 'src/app/util/countries';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  errorMessageTitleSaveCustomer;
  errorMessageDescriptionSaveCustomer;

  countries = [];
  communicationMessagesTypeArray: CommunicationType[] = [];
  addCompanyName: string;
  addForename: string;
  addSurname: string;
  addStreet: string;
  addPostcode: number;
  addCity: string;
  addCountry: string;
  addEmail: string;
  addTelephone: string;
  addWebsite: string;
  addIban: string;
  addBic: string;
  addBankInformation: string;
  addFacebook: string;
  addTwitter: string;
  addLinkedin: string;
  addXing: string;
  addSocialMedia: string;
  addLanguage: string;
  addTimezone: string;
  addCustomerNote: string;
  newCommunicationMessageCommunicationType: CommunicationType;
  newCommunicationMessageMessage: string;
  newCommunicationMessageTags: string[];
  addCustomerNoteTitle: string;
  addCustomerNoteDescription: string;
  addCustomerNoteUrl: string;


  constructor(countries: Countries, private communicationTypeService: CommunicationTypeService, private customerService: CustomerService, public translate: TranslateService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.countries = countries.countriesArray;
  }


  ngOnInit(): void {
    this.translate.get(['errorMessages.addCustomerSaveTitle', 'errorMessages.editCustomerSaveDescription']).subscribe(translations => {
      this.errorMessageTitleSaveCustomer = translations['errorMessages.addCustomerSaveTitle'];
      this.errorMessageDescriptionSaveCustomer = translations['errorMessages.editCustomerSaveDescription'];
    });

    this.communicationTypeService.getAllCommunicationType().subscribe((data: CommunicationType[]) => {
      this.communicationMessagesTypeArray = data;
    }, err => { });
  }

  addCustomer() {
    let customerCommunicationMessagesArray = [];
    let customerNotesArray = [];

    if (this.newCommunicationMessageTags !== undefined && this.newCommunicationMessageTags !== null && this.newCommunicationMessageTags.length > 0) {
      switch (this.newCommunicationMessageTags.length) {
        case 1: customerCommunicationMessagesArray.push({ type: this.newCommunicationMessageCommunicationType, message: this.newCommunicationMessageMessage, tag1: this.newCommunicationMessageTags[0] });
        case 2: customerCommunicationMessagesArray.push({ type: this.newCommunicationMessageCommunicationType, message: this.newCommunicationMessageMessage, tag1: this.newCommunicationMessageTags[0], tag2: this.newCommunicationMessageTags[1] });
        case 3: customerCommunicationMessagesArray.push({ type: this.newCommunicationMessageCommunicationType, message: this.newCommunicationMessageMessage, tag1: this.newCommunicationMessageTags[0], tag2: this.newCommunicationMessageTags[1], tag3: this.newCommunicationMessageTags[2] });
        case 4: customerCommunicationMessagesArray.push({ type: this.newCommunicationMessageCommunicationType, message: this.newCommunicationMessageMessage, tag1: this.newCommunicationMessageTags[0], tag2: this.newCommunicationMessageTags[1], tag3: this.newCommunicationMessageTags[2], tag4: this.newCommunicationMessageTags[3] });
        default: customerCommunicationMessagesArray.push({ type: this.newCommunicationMessageCommunicationType, message: this.newCommunicationMessageMessage, tag1: this.newCommunicationMessageTags[0], tag2: this.newCommunicationMessageTags[1], tag3: this.newCommunicationMessageTags[2], tag4: this.newCommunicationMessageTags[3] });
      }
    } else {
      customerCommunicationMessagesArray.push({ type: this.newCommunicationMessageCommunicationType, message: this.newCommunicationMessageMessage });
    }

    if (this.addCustomerNoteTitle != undefined && this.addCustomerNoteTitle != "") {
      customerNotesArray.push({ title: this.addCustomerNoteTitle, description: this.addCustomerNoteDescription, link: this.addCustomerNoteUrl });
    }

    this.customerService.addCustomer(this.addCompanyName, this.addForename, this.addSurname, this.addEmail, this.addTelephone, this.addStreet, this.addCity, this.addPostcode, this.addCountry, this.addIban, this.addBic, this.addBankInformation, this.addWebsite, this.addFacebook, this.addTwitter, this.addLinkedin, this.addXing, this.addSocialMedia, this.addLanguage, this.addTimezone, this.addCustomerNote, customerCommunicationMessagesArray, customerNotesArray).subscribe(res => {
      this.router.navigate([`/`]);
      //  this.messageService.add({ severity: 'info', life: 4000, summary: this.successMessageTitleSaveCustomer, detail: this.successMessageDescriptionSaveCustomer });
    }, err => {
      this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessageTitleSaveCustomer, detail: this.errorMessageDescriptionSaveCustomer });
    });
  }


}
