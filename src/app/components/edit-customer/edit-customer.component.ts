import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SelectItem } from 'primeng/api';
import { CommunicationMessage } from 'src/app/model/communicationmessage.model';
import { CommunicationType } from 'src/app/model/communicationtype';
import { Customer } from 'src/app/model/customer.model';
import { CustomerNote } from 'src/app/model/customernote';
import { CommunicationTypeService } from 'src/app/services/communicationtype.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Countries, Country } from 'src/app/util/countries';
import { faRoad, faSuitcase, faUser, faMapMarkerAlt, faCity, faGlobeAmericas, faAt, faPhone, faMoneyCheck, faUniversity, faMoneyCheckAlt, faShareAlt, faLanguage, faClock, faComments, faStickyNote, faCheck, faComment, faFolderOpen, faBell } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser, } from '@fortawesome/free-regular-svg-icons';
import { faInternetExplorer, faFacebook, faTwitter, faLinkedin, faXing } from '@fortawesome/free-brands-svg-icons';
import { Timezone, Timezones } from 'src/app/util/timezones';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  errorMessageTitleSaveCustomer;
  errorMessageDescriptionSaveCustomer;
  successMessageTitleSaveCustomer;
  successMessageDescriptionSaveCustomer;

  countries: Country[] = [];
  timezones: Timezone[] = [];

  //Site title containig the company name or forename and surname. 
  siteTitle: string;
  selectedCustomer: Customer;
  customerCommunicationMessagesArray: CommunicationMessage[];
  customerNotesArray: CustomerNote[];
  selectedId: string;
  editCompanyName: string;
  editForename: string;
  editSurname: string;
  editStreet: string;
  editPostcode: number;
  editCity: string;
  editCountry: string;
  editEmail: string;
  editTelephone: string;
  editWebsite: string;
  editIban: string;
  editBic: string;
  editBankInformation: string;
  editFacebook: string;
  editTwitter: string;
  editLinkedin: string;
  editXing: string;
  editSocialMedia: string;
  editLanguage: string;
  editTimezone: string = "UTC-00:00";
  editCustomerNote: string;

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
  faCheck = faCheck;
  faComment = faComment;
  faFolderOpen = faFolderOpen;
  faBell = faBell;
  
  selectedCountry: Country;
  selectedTimezone: Timezone;

  constructor(timezones: Timezones, private communicationTypeService: CommunicationTypeService, countries: Countries, private customerService: CustomerService, public translate: TranslateService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.countries = countries.countriesArray;
    this.timezones = timezones.timezonesArray;
    this.selectedCountry=this.countries[0];
    this.selectedTimezone=this.timezones[0];
  }

  ngOnInit(): void {
    this.translate.get(['errorMessages.editCustomerUpdateTitle', 'errorMessages.editCustomerUpdateDescription', 'editCustomer.communicationMesssageSortOptionDateAsc', 'editCustomer.communicationMesssageSortOptionDateDesc', 'editCustomer.customerNoteSortOptionDateAsc', 'editCustomer.customerNoteSortOptionDateDesc']).subscribe(translations => {
      this.errorMessageTitleSaveCustomer = translations['errorMessages.editCustomerUpdateTitle'];
      this.errorMessageDescriptionSaveCustomer = translations['errorMessages.editCustomerUpdateDescription'];
    });

    this.route.params.subscribe(params => {
      this.selectedId = params.id;
      this.customerService.getCustomerById(this.selectedId).subscribe((res: Customer) => {
        this.selectedCustomer = res;
        if (this.selectedCustomer.companyName.trim() !== "" && this.selectedCustomer.forename.trim() !== "") {
          this.siteTitle = this.selectedCustomer.companyName + " - " + this.selectedCustomer.forename + " " + this.selectedCustomer.surname;
        } else {
          this.siteTitle = this.selectedCustomer.companyName;
        }
        this.loadCustomerValues(this.selectedCustomer);
        this.loadSelectedCountry();
        this.loadSelectedTimezone();
        this.customerCommunicationMessagesArray = this.selectedCustomer.communicationMessageList;
        this.customerNotesArray = this.selectedCustomer.customerNoteList;
      }, err => {
      //  this.showErrorPage();
      });
    }, err => {
     // this.showErrorPage();
    });
  }

  showErrorPage() {
    this.router.navigate(['/']);
  }

  loadCustomerValues(loadedCustomer) {
    this.selectedId = loadedCustomer.customerId;
    this.editCompanyName = loadedCustomer.companyName;
    this.editForename = loadedCustomer.forename;
    this.editSurname = loadedCustomer.surname;
    this.editStreet = loadedCustomer.street;
    this.editPostcode = loadedCustomer.postCode;
    this.editCity = loadedCustomer.city;
    this.editCountry = loadedCustomer.country;
    this.editEmail = loadedCustomer.email;
    this.editTelephone = loadedCustomer.telephone;
    this.editWebsite = loadedCustomer.website;
    this.editIban = loadedCustomer.IBAN;
    this.editBic = loadedCustomer.BIC;
    this.editBankInformation = loadedCustomer.bankInformation;
    this.editFacebook = loadedCustomer.facebookUrl;
    this.editTwitter = loadedCustomer.twitterUrl;
    this.editLinkedin = loadedCustomer.linkedinUrl;
    this.editXing = loadedCustomer.xingUrl;
    this.editSocialMedia = loadedCustomer.socialmediaUrl;
    this.editLanguage = loadedCustomer.language;
    this.editTimezone = loadedCustomer.timezone;
    this.editCustomerNote = loadedCustomer.note;
  }

  /**
   * Load selected country in the dropdown. Run after method loadCustomerValues(loadedCustomer).
   */
  loadSelectedCountry() {
    this.selectedCountry = this.countries.filter(countryItem => { return countryItem.name === this.editCountry; })[0];
  }

  /**
   * Load selected timezone in the dropdown. Run after method loadCustomerValues(loadedCustomer).
   */
  loadSelectedTimezone() {
    this.selectedTimezone = this.timezones.filter(timezoneItem => { return timezoneItem.timezone === this.editTimezone; })[0];
  }

  updateSelectedCountry(selectedCountry) {
    this.selectedCountry=selectedCountry;
  }

  updateSelectedTimezone(selectedTimezone) {
    this.selectedCountry=selectedTimezone;
  }

  saveCustomer() {
    this.customerService.updateCustomer(this.selectedId, this.editCompanyName, this.editForename, this.editSurname, this.editEmail, this.editTelephone, this.editStreet, this.editCity, this.editPostcode, this.editCountry, this.editIban, this.editBic, this.editBankInformation, this.editWebsite, this.editFacebook, this.editTwitter, this.editLinkedin, this.editXing, this.editSocialMedia, this.editLanguage, this.editTimezone, this.editCustomerNote, this.customerCommunicationMessagesArray, this.customerNotesArray).subscribe(res => {
      this.router.navigate([`/`]);
      //  this.messageService.add({ severity: 'info', life: 4000, summary: this.successMessageTitleSaveCustomer, detail: this.successMessageDescriptionSaveCustomer });
    }, err => {
      this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessageTitleSaveCustomer, detail: this.errorMessageDescriptionSaveCustomer });
    });
  }

}
