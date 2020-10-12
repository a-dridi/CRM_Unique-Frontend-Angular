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
import { Countries } from 'src/app/util/countries';

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

  countries = [];
  communicationMessageSortOrder: number;
  communicationMessageSortOptions: SelectItem[];
  communicationMessageSortField: string;
  customerNoteSortOrder: number;
  customerNoteSortOptions: SelectItem[];
  customerNoteSortField: string;
  communicationMessagesTypeArray: CommunicationType[] = [];

  //Site title containig the company name or forename and surname. 
  siteTitle: string;
  selectedCustomer: Customer;
  customerCommunicationMessagesArray: CommunicationMessage[];
  customerNotesArray: CustomerNote[];
  selectedId: number;
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
  editTimezone: string;
  editCustomerNote: string;
  newCommunicationMessageCommunicationType: CommunicationType;
  newCommunicationMessageMessage: string;
  newCommunicationMessageTags: string[];
  addCustomerNoteTitle: string;
  addCustomerNoteDescription: string;
  addCustomerNoteUrl: string;


  constructor(private communicationTypeService: CommunicationTypeService, countries: Countries, private customerService: CustomerService, public translate: TranslateService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.countries = countries.countriesArray;
  }

  ngOnInit(): void {
    this.translate.get(['errorMessages.editCustomerUpdateTitle', 'errorMessages.editCustomerUpdateDescription', 'editCustomer.communicationMesssageSortOptionDateAsc', 'editCustomer.communicationMesssageSortOptionDateDesc', 'editCustomer.customerNoteSortOptionDateAsc', 'editCustomer.customerNoteSortOptionDateDesc']).subscribe(translations => {
      this.errorMessageTitleSaveCustomer = translations['errorMessages.editCustomerUpdateTitle'];
      this.errorMessageDescriptionSaveCustomer = translations['errorMessages.editCustomerUpdateDescription'];
      this.communicationMessageSortOptions = [
        { label: translations['editCustomer.communicationMesssageSortOptionDateAsc'], value: 'createdDate' },
        { label: translations['editCustomer.communicationMesssageSortOptionDateDesc'], value: '!createdDate' }
      ];
      this.customerNoteSortOptions = [
        { label: translations['editCustomer.customerNoteSortOptionDateAsc'], value: 'createdDate' },
        { label: translations['editCustomer.customerNoteSortOptionDateDesc'], value: '!createdDate' }
      ];
    });

    this.communicationTypeService.getAllCommunicationType().subscribe((data: CommunicationType[]) => {
      this.communicationMessagesTypeArray = data;
    }, err => { });

    this.route.params.subscribe(params => {
      this.selectedId = params.id;
      this.customerService.getCustomerById(this.selectedId).subscribe((res: Customer) => {
        this.selectedCustomer = res;
        if (this.selectedCustomer.forename !== "") {
          this.siteTitle = this.selectedCustomer.companyName + " - " + this.selectedCustomer.forename + " " + this.selectedCustomer.surname;
        } else {
          this.siteTitle = this.selectedCustomer.companyName;
        }
        this.loadCustomerValues(this.selectedCustomer);
        this.customerCommunicationMessagesArray = this.selectedCustomer.communicationMessageList;
        this.customerNotesArray = this.selectedCustomer.customerNoteList;
      }, err => {
        this.showErrorPage();
      });
    }, err => {
      this.showErrorPage();
    });
  }

  onCommunicationMessageSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.communicationMessageSortOrder = -1;
      this.communicationMessageSortField = value.substring(1, value.length);
    }
    else {
      this.communicationMessageSortOrder = 1;
      this.communicationMessageSortField = value;
    }
  }

  onCustomerNoteSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.customerNoteSortOrder = -1;
      this.customerNoteSortField = value.substring(1, value.length);
    }
    else {
      this.customerNoteSortOrder = 1;
      this.customerNoteSortField = value;
    }
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

  saveCustomer() {
    this.customerService.updateCustomer(this.selectedId, this.editCompanyName, this.editForename, this.editSurname, this.editEmail, this.editTelephone, this.editStreet, this.editCity, this.editPostcode, this.editCountry, this.editIban, this.editBic, this.editBankInformation, this.editWebsite, this.editFacebook, this.editTwitter, this.editLinkedin, this.editXing, this.editSocialMedia, this.editLanguage, this.editTimezone, this.editCustomerNote, this.customerCommunicationMessagesArray, this.customerNotesArray).subscribe(res => {
      this.router.navigate([`/`]);
      //  this.messageService.add({ severity: 'info', life: 4000, summary: this.successMessageTitleSaveCustomer, detail: this.successMessageDescriptionSaveCustomer });
    }, err => {
      this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessageTitleSaveCustomer, detail: this.errorMessageDescriptionSaveCustomer });
    });
  }

  addNewCommunicationMessage() {
    if (this.newCommunicationMessageTags !== undefined && this.newCommunicationMessageTags !== null && this.newCommunicationMessageTags.length > 0) {
      switch (this.newCommunicationMessageTags.length) {
        case 1: this.customerCommunicationMessagesArray.push({ type: this.newCommunicationMessageCommunicationType, message: this.newCommunicationMessageMessage, tag1: this.newCommunicationMessageTags[0] });
        case 2: this.customerCommunicationMessagesArray.push({ type: this.newCommunicationMessageCommunicationType, message: this.newCommunicationMessageMessage, tag1: this.newCommunicationMessageTags[0], tag2: this.newCommunicationMessageTags[1] });
        case 3: this.customerCommunicationMessagesArray.push({ type: this.newCommunicationMessageCommunicationType, message: this.newCommunicationMessageMessage, tag1: this.newCommunicationMessageTags[0], tag2: this.newCommunicationMessageTags[1], tag3: this.newCommunicationMessageTags[2] });
        case 4: this.customerCommunicationMessagesArray.push({ type: this.newCommunicationMessageCommunicationType, message: this.newCommunicationMessageMessage, tag1: this.newCommunicationMessageTags[0], tag2: this.newCommunicationMessageTags[1], tag3: this.newCommunicationMessageTags[2], tag4: this.newCommunicationMessageTags[3] });
        default: this.customerCommunicationMessagesArray.push({ type: this.newCommunicationMessageCommunicationType, message: this.newCommunicationMessageMessage, tag1: this.newCommunicationMessageTags[0], tag2: this.newCommunicationMessageTags[1], tag3: this.newCommunicationMessageTags[2], tag4: this.newCommunicationMessageTags[3] });
      }
    } else {
      if (this.customerCommunicationMessagesArray != null && this.customerCommunicationMessagesArray != undefined) {
        this.customerCommunicationMessagesArray.push({ type: this.newCommunicationMessageCommunicationType, message: this.newCommunicationMessageMessage });
      } else {
        this.customerCommunicationMessagesArray = [];
        this.customerCommunicationMessagesArray.push({ type: this.newCommunicationMessageCommunicationType, message: this.newCommunicationMessageMessage });
      }
    }

    this.customerService.updateCustomer(this.selectedId, this.editCompanyName, this.editForename, this.editSurname, this.editEmail, this.editTelephone, this.editStreet, this.editCity, this.editPostcode, this.editCountry, this.editIban, this.editBic, this.editBankInformation, this.editWebsite, this.editFacebook, this.editTwitter, this.editLinkedin, this.editXing, this.editSocialMedia, this.editLanguage, this.editTimezone, this.editCustomerNote, this.customerCommunicationMessagesArray, this.customerNotesArray).subscribe(res => {
      //  this.messageService.add({ severity: 'info', life: 4000, summary: this.successMessageTitleSaveCustomer, detail: this.successMessageDescriptionSaveCustomer });
    }, err => {
      this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessageTitleSaveCustomer, detail: this.errorMessageDescriptionSaveCustomer });
    });
  }


  addNewCustomerNote() {
    if (this.customerNotesArray != null && this.customerNotesArray != undefined) {
      this.customerNotesArray.push({ title: this.addCustomerNoteTitle, description: this.addCustomerNoteDescription, link: this.addCustomerNoteUrl });
    } else {
      this.customerNotesArray = [];
      this.customerNotesArray.push({ title: this.addCustomerNoteTitle, description: this.addCustomerNoteDescription, link: this.addCustomerNoteUrl });
    }

    this.customerService.updateCustomer(this.selectedId, this.editCompanyName, this.editForename, this.editSurname, this.editEmail, this.editTelephone, this.editStreet, this.editCity, this.editPostcode, this.editCountry, this.editIban, this.editBic, this.editBankInformation, this.editWebsite, this.editFacebook, this.editTwitter, this.editLinkedin, this.editXing, this.editSocialMedia, this.editLanguage, this.editTimezone, this.editCustomerNote, this.customerCommunicationMessagesArray, this.customerNotesArray).subscribe(res => {
      //  this.messageService.add({ severity: 'info', life: 4000, summary: this.successMessageTitleSaveCustomer, detail: this.successMessageDescriptionSaveCustomer });
    }, err => {
      this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessageTitleSaveCustomer, detail: this.errorMessageDescriptionSaveCustomer });
    });
  }


}
