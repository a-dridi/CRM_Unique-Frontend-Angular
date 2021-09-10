import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Customer } from 'src/app/model/customer.model';
import { CustomerNote } from 'src/app/model/customernote';
import { CustomerNoteService } from 'src/app/services/customer-note.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer-note',
  templateUrl: './edit-customer-note.component.html',
  styleUrls: ['./edit-customer-note.component.scss']
})
export class EditCustomerNoteComponent implements OnInit {
  faStickyNote = faStickyNote;

  //Error/Info text message
  errorMessageTitleSaveNote;
  errorMessageDescriptionSaveNote;
  successMessageTitleSaveNote;
  successMessageDescriptionSaveNote;

  customerNoteSortOrder: number;
  customerNoteSortOptions: SelectItem[];
  customerNoteSortField: string;

  selectedId: number;
  customerName: string;

  customerNotes: CustomerNote[];

  addCustomerNoteTitle: string;
  addCustomerNoteDescription: string;
  addCustomerNoteUrl: string;

  constructor(private customerNoteService: CustomerNoteService, private customerService: CustomerService, public translate: TranslateService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.translate.get(['editCustomer.customerNoteSortOptionDateAsc', 'editCustomer.customerNoteSortOptionDateDesc', 'errorMessages.customernoteSaveTitle', 'errorMessages.customernoteSaveDescription', 'successMessages.customernoteSaveTitle', 'successMessages.customernoteSaveDescription']).subscribe(translations => {
      this.customerNoteSortOptions = [
        { label: translations['editCustomer.customerNoteSortOptionDateAsc'], value: 'createdDate' },
        { label: translations['editCustomer.customerNoteSortOptionDateDesc'], value: '!createdDate' }
      ];

      this.errorMessageTitleSaveNote = translations['errorMessages.customernoteSaveTitle'];
      this.errorMessageDescriptionSaveNote = translations['errorMessages.customernoteSaveTitle'];
      this.successMessageTitleSaveNote = translations['successMessages.customernoteSaveTitle'];
      this.successMessageDescriptionSaveNote = translations['successMessages.customernoteSaveTitle'];
    });

    this.route.params.subscribe(params => {
      this.selectedId = params.id;
      this.customerService.getCustomerById(this.selectedId).subscribe((selectedCustomer: Customer) => {
        if (selectedCustomer.forename !== "") {
          this.customerName = selectedCustomer.companyName + " - " + selectedCustomer.forename + " " + selectedCustomer.surname;
        } else {
          this.customerName = selectedCustomer.companyName;
        }
        this.customerNoteService.getAllCustomerNote(this.selectedId + '').subscribe((data: CustomerNote[]) => {
          this.customerNotes = data;
        });
      }, err => {
        //  this.showErrorPage();
      });
    }, err => {
      // this.showErrorPage();
    });
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

  reloadData() {
    this.customerNoteService.getAllCustomerNote(this.selectedId + '').subscribe((data: CustomerNote[]) => {
      this.customerNotes = data;
    });
  }

  addNewCustomerNote() {
    this.customerNoteService.addCustomerNote(this.selectedId, this.addCustomerNoteTitle, this.addCustomerNoteDescription, this.addCustomerNoteUrl).subscribe(() => {
      this.reloadData();
      this.messageService.add({ severity: 'success', life: 8000, summary: this.successMessageTitleSaveNote, detail: this.successMessageDescriptionSaveNote });
    }, err => {
      console.log(err);
      this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessageTitleSaveNote, detail: this.errorMessageDescriptionSaveNote });
    });
  }
}