import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCommentMedical, faComments, faTags } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SelectItem } from 'primeng/api';
import { CommunicationMessage } from 'src/app/model/communicationmessage.model';
import { CommunicationType } from 'src/app/model/communicationtype';
import { Customer } from 'src/app/model/customer.model';
import { CommunicationMessageService } from 'src/app/services/communication-message.service';
import { CommunicationTypeService } from 'src/app/services/communicationtype.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-communication-message',
  templateUrl: './edit-communication-message.component.html',
  styleUrls: ['./edit-communication-message.component.scss']
})
export class EditCommunicationMessageComponent implements OnInit {

  faComments = faComments;
  faCommentMedical = faCommentMedical;
  faTags = faTags;

  //Error/Info text message
  errorMessageTitleSaveCommunication;
  errorMessageDescriptionSaveCommunication;
  successMessageTitleSaveCommunication;
  successMessageDescriptionSaveCommunication;

  selectedId: number;
  customerName: string;
  selectedCustomer: Customer;

  communicationMessageSortOrder: number;
  communicationMessageSortOptions: SelectItem[];
  communicationMessageSortField: string;

  communicationMessagesTypeArray: CommunicationType[] = [];
  communicationMessages: CommunicationMessage[];

  newCommunicationMessageCommunicationType: CommunicationType;
  newCommunicationMessageMessage: string;
  newCommunicationMessageTags: string[];

  customerCommunicationMessagesArray: CommunicationMessage[];

  constructor(private communicationMessageService: CommunicationMessageService, private communicationTypeService: CommunicationTypeService, private customerService: CustomerService, public translate: TranslateService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.translate.get(['errorMessages.customernoteSaveTitle', 'errorMessages.customernoteSaveDescription', 'successMessages.customernoteSaveTitle', 'successMessages.customernoteSaveDescription', 'editCustomer.communicationMesssageSortOptionDateAsc', 'editCustomer.communicationMesssageSortOptionDateDesc', 'editCustomer.customerNoteSortOptionDateAsc', 'editCustomer.customerNoteSortOptionDateDesc']).subscribe(translations => {
      this.errorMessageTitleSaveCommunication = translations['errorMessages.communicationmessageSaveDescription'];
      this.errorMessageDescriptionSaveCommunication = translations['errorMessages.customernoteSaveDescription'];
      this.successMessageTitleSaveCommunication = translations['successMessages.communicationmessageSaveTitle'];
      this.successMessageDescriptionSaveCommunication = translations['successMessages.communicationmessageSaveDescription'];
      this.communicationMessageSortOptions = [
        { label: translations['editCustomer.communicationMesssageSortOptionDateAsc'], value: 'createdDate' },
        { label: translations['editCustomer.communicationMesssageSortOptionDateDesc'], value: '!createdDate' }
      ];
    });

    this.route.params.subscribe(params => {
      this.selectedId = params.id;
      this.customerService.getCustomerById(this.selectedId).subscribe((selectedCustomer: Customer) => {
        if (selectedCustomer.forename !== "") {
          this.customerName = selectedCustomer.companyName + " - " + selectedCustomer.forename + " " + selectedCustomer.surname;
        } else {
          this.customerName = selectedCustomer.companyName;
        }
        this.selectedCustomer = selectedCustomer;
        this.communicationTypeService.getAllCommunicationType().subscribe((data: CommunicationType[]) => {
          this.communicationMessagesTypeArray = data;
        }, err => { });

        this.communicationMessageService.getAllCommunicationMessage(this.selectedCustomer._id).subscribe((data: CommunicationMessage[]) => {
          this.communicationMessages = data;
        });
      }, err => {
        //  this.showErrorPage();
      });
    }, err => {
      // this.showErrorPage();
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

  reloadData() {
    this.communicationMessageService.getAllCommunicationMessage(this.selectedCustomer._id).subscribe((data: CommunicationMessage[]) => {
      this.communicationMessages = data;
    });
  }

  addNewCommunicationMessage() {
    if (this.newCommunicationMessageTags !== undefined && this.newCommunicationMessageTags !== null && this.newCommunicationMessageTags.length > 0) {
      switch (this.newCommunicationMessageTags.length) {
        case 1: this.communicationMessageService.addCommunicationMessage(this.selectedId, this.newCommunicationMessageCommunicationType, this.newCommunicationMessageMessage, this.newCommunicationMessageTags[0], "", "", "", "")
          .subscribe(() => { this.showAddedSuccess(); this.reloadData(); }, err => { this.showAddedError(); console.log(err) });
          break;
        case 2: this.communicationMessageService.addCommunicationMessage(this.selectedId, this.newCommunicationMessageCommunicationType, this.newCommunicationMessageMessage, this.newCommunicationMessageTags[0], this.newCommunicationMessageTags[1], "", "", "")
          .subscribe(() => { this.showAddedSuccess(); this.reloadData(); }, err => { this.showAddedError(); console.log(err) });
          break;
        case 3: this.communicationMessageService.addCommunicationMessage(this.selectedId, this.newCommunicationMessageCommunicationType, this.newCommunicationMessageMessage, this.newCommunicationMessageTags[0], this.newCommunicationMessageTags[1], this.newCommunicationMessageTags[2], "", "")
          .subscribe(() => { this.showAddedSuccess(); this.reloadData(); }, err => { this.showAddedError(); console.log(err) });
          break;
        case 4: this.communicationMessageService.addCommunicationMessage(this.selectedId, this.newCommunicationMessageCommunicationType, this.newCommunicationMessageMessage, this.newCommunicationMessageTags[0], this.newCommunicationMessageTags[1], this.newCommunicationMessageTags[2], this.newCommunicationMessageTags[3], "")
          .subscribe(() => { this.showAddedSuccess(); this.reloadData(); }, err => { this.showAddedError(); console.log(err) });
          break;
        default: this.communicationMessageService.addCommunicationMessage(this.selectedId, this.newCommunicationMessageCommunicationType, this.newCommunicationMessageMessage, this.newCommunicationMessageTags[0], this.newCommunicationMessageTags[1], this.newCommunicationMessageTags[2], this.newCommunicationMessageTags[3], this.newCommunicationMessageTags[4])
          .subscribe(() => { this.showAddedSuccess(); this.reloadData(); }, err => { this.showAddedError(); console.log(err) });
          break;
      }
    } else {
      this.communicationMessageService.addCommunicationMessage(this.selectedId, this.newCommunicationMessageCommunicationType, this.newCommunicationMessageMessage, "", "", "", "", "").subscribe(() => {
        this.reloadData();
        this.showAddedSuccess();
      }, err => {
        console.log(err);
        this.showAddedError();
      });
    }
  }

  showAddedSuccess() {
    this.messageService.add({ severity: 'success', life: 8000, summary: this.successMessageTitleSaveCommunication, detail: this.successMessageDescriptionSaveCommunication });
  }

  showAddedError() {
    this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessageTitleSaveCommunication, detail: this.errorMessageDescriptionSaveCommunication });
  }
}
