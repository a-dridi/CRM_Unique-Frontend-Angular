import { Component, NgModuleFactoryLoader, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { CommunicationType } from 'src/app/model/communicationtype';
import { CommunicationTypeService } from 'src/app/services/communicationtype.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Countries, Country } from 'src/app/util/countries';
import { faRoad, faSuitcase, faUser, faMapMarkerAlt, faCity, faGlobeAmericas, faAt, faPhone, faMoneyCheck, faUniversity, faMoneyCheckAlt, faShareAlt, faLanguage, faClock, faComments, faStickyNote, faPlus, faTags, faLink, faHeading } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser, } from '@fortawesome/free-regular-svg-icons';
import { faInternetExplorer, faFacebook, faTwitter, faLinkedin, faXing } from '@fortawesome/free-brands-svg-icons';
import { Timezone, Timezones } from 'src/app/util/timezones';
import { Customer } from 'src/app/model/customer.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  errorMessageTitleSaveCustomer;
  errorMessageDescriptionSaveCustomer;

  countries: Country[] = [];
  timezones: Timezone[] = [];
  communicationMessagesTypeArray: CommunicationType[] = [];
  addCompanyName: string = "";
  addForename: string = "";
  addSurname: string ="";
  addStreet: string;
  addPostcode: number;
  addCity: string;
  addCountry: string = "";
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
  addTimezone: string = "UTC-00:00";
  addCustomerNote: string;
  newCommunicationMessageCommunicationType: CommunicationType;
  newCommunicationMessageMessage: string;
  newCommunicationMessageTags: string[];
  addCustomerNoteTitle: string;
  addCustomerNoteDescription: string;
  addCustomerNoteUrl: string;

  selectedCountry: Country;
  selectedTimezone: Timezone;

  //Icons
  faRoad = faRoad;
  faSuitcase = faSuitcase;
  faUser = faUser;
  farUser = farUser;
  faMapMarkerAlt = faMapMarkerAlt;
  faCity = faCity;
  faGlobeAmericas = faGlobeAmericas;
  faAt = faAt;
  faPhone = faPhone;
  faInternetExplorer = faInternetExplorer;
  faMoneyCheck = faMoneyCheck;
  faUniversity = faUniversity;
  faMoneyCheckAlt = faMoneyCheckAlt;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faXing = faXing;
  faShareAlt = faShareAlt;
  faLanguage = faLanguage;
  faClock = faClock;
  faComments = faComments;
  faStickyNote = faStickyNote;
  faPlus = faPlus;
  faTags = faTags;
  faHeading = faHeading;
  faLink = faLink;

  constructor(countries: Countries, timezones: Timezones, private customerService: CustomerService, public translate: TranslateService, private router: Router, private messageService: MessageService) {
    this.countries = countries.countriesArray;
    this.timezones = timezones.timezonesArray;
    this.selectedCountry=this.countries[0];
    this.selectedTimezone=this.timezones[0];
  }


  ngOnInit(): void {
    this.translate.get(['errorMessages.addCustomerSaveTitle', 'errorMessages.editCustomerSaveDescription']).subscribe(translations => {
      this.errorMessageTitleSaveCustomer = translations['errorMessages.addCustomerSaveTitle'];
      this.errorMessageDescriptionSaveCustomer = translations['errorMessages.editCustomerSaveDescription'];
    });
  }

  addCustomer() {
    let customerCommunicationMessagesArray = [];
    let customerNotesArray = [];

    if(this.addCompanyName.trim() === "" && this.addForename.trim() === "" && this.addSurname.trim() === "") {
      this.translate.get(['errorMessages.addCustomerSaveTitle', 'errorMessages.addCustomerSaveDesc1']).subscribe(translations => {
        this.messageService.add({ severity: 'error', life: 8000, summary: translations['errorMessages.addCustomerSaveTitle'], detail: translations['errorMessages.addCustomerSaveDesc1'] });
      });
      return;
    }

    this.customerService.addCustomer(this.addCompanyName, this.addForename, this.addSurname, this.addEmail, this.addTelephone, this.addStreet, this.addCity, this.addPostcode, this.addCountry, this.addIban, this.addBic, this.addBankInformation, this.addWebsite, this.addFacebook, this.addTwitter, this.addLinkedin, this.addXing, this.addSocialMedia, this.addLanguage, this.addTimezone, this.addCustomerNote, customerCommunicationMessagesArray, customerNotesArray).subscribe((createdCustomer: Customer) => {
      this.router.navigate([`customer/edit/` + createdCustomer._id]);
      //  this.messageService.add({ severity: 'success', life: 4000, summary: this.successMessageTitleSaveCustomer, detail: this.successMessageDescriptionSaveCustomer });
    }, err => {
      console.log(err);
      this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessageTitleSaveCustomer, detail: this.errorMessageDescriptionSaveCustomer });
    });
  }

  updateSelectedCountry(selectedCountry) {
    this.selectedCountry=selectedCountry;
  }

  updateSelectedTimezone(selectedTimezone) {
    this.selectedTimezone=selectedTimezone;
  }
}
