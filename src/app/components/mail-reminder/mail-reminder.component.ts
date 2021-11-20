import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Customer } from 'src/app/model/customer.model';
import { MailReminder } from 'src/app/model/mail-reminder.model';
import { CustomerService } from 'src/app/services/customer.service';
import { MailReminderService } from 'src/app/services/mail-reminder.service';

@Component({
  selector: 'app-mail-reminder',
  templateUrl: './mail-reminder.component.html',
  styleUrls: ['./mail-reminder.component.scss']
})
export class MailReminderComponent implements OnInit {

  //Error/Info text message
  errorMessageErrorTitle;
  errorMessageReminderTitle;
  errorMessageReminderText;
  errorMessageReminderDate;
  errorMessageReminderSaveError;

  successMessageSuccessTitle;
  successMessageReminderSaved;

  loadedCustomer: Customer;

  mailReminders: MailReminder[];

  addReminderTitle: string = "";
  addReminderText: string = "";
  addReminderDate: Date = new Date();

  addReminderTitlePlaceholder = "";
  editorConfig: AngularEditorConfig = {};

  faPlus = faPlus;

  constructor(private mailReminderService: MailReminderService, private customerService: CustomerService, private route: ActivatedRoute, private router: Router, public translate: TranslateService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: "300px",
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: '',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        { class: 'arial', name: 'Arial' },
        { class: 'times-new-roman', name: 'Times New Roman' },
        { class: 'calibri', name: 'Calibri' },
        { class: 'comic-sans-ms', name: 'Comic Sans MS' }
      ],
      customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      uploadWithCredentials: false,
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        ['insertImage', 'insertVideo']
      ]
    };

    this.translate.get(['errorMessages.mailReminderSaveErrorTitle', 'errorMessages.mailReminderTitle', 'errorMessages.mailReminderText', 'errorMessages.mailReminderDate', 'errorMessages.mailReminderSaveError', 'successMessages.communicationmessageSaveTitle', 'successMessages.communicationmessageSaveDescription', 'createMailReminder.formAddTitle']).subscribe(translations => {
      this.errorMessageErrorTitle = translations['errorMessages.mailReminderSaveErrorTitle'];
      this.errorMessageReminderTitle = translations['errorMessages.mailReminderTitle'];
      this.errorMessageReminderText = translations['errorMessages.mailReminderText'];
      this.errorMessageReminderDate = translations['errorMessages.mailReminderDate'];
      this.errorMessageReminderSaveError = translations['errorMessages.mailReminderSaveError'];
      this.successMessageSuccessTitle = translations['successMessages.communicationmessageSaveTitle'];
      this.successMessageReminderSaved = translations['successMessages.communicationmessageSaveDescription'];
      this.addReminderTitlePlaceholder = translations['createMailReminder.formAddTitle'];
    });

    this.route.params.subscribe(params => {
      this.getLoadedCustomerObject(params.id);
      this.loadMailRemindersOfCustomer(params.id);
    });
  }

  loadMailRemindersOfCustomer(customerId: string) {
    this.mailReminderService.getAllMailReminders(customerId).subscribe((mailReminders: MailReminder[]) => {
      this.mailReminders = mailReminders;
    }, err => {
      console.log(err);
    })
  }

  getLoadedCustomerObject(customerId: string) {
    this.customerService.getCustomerById(customerId).subscribe((selectedCustomer: Customer) => {
      this.loadedCustomer = selectedCustomer;
    }, err => {
      console.log(err);
      this.router.navigate(['/']);
    });
  }

  addReminder(): void {
    let customerName;
    if (this.loadedCustomer.forename.trim() === "") {
      customerName = this.loadedCustomer.companyName;
    } else {
      customerName = this.loadedCustomer.forename + " " + this.loadedCustomer.surname;
    }

    if (this.addReminderTitle.trim() === "") {
      this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessageErrorTitle, detail: this.errorMessageReminderTitle });
      return;
    }
    if (this.addReminderTitle.trim() === "") {
      this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessageErrorTitle, detail: this.errorMessageReminderText });
      return;
    }
    if (this.addReminderDate === null) {
      this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessageErrorTitle, detail: this.errorMessageReminderDate });
      return;
    }

    this.mailReminderService.addMailReminder(this.loadedCustomer._id, customerName, this.loadedCustomer.email, this.addReminderTitle, this.addReminderText, this.addReminderDate).subscribe(() => {
      this.messageService.add({ severity: 'success', life: 8000, summary: this.successMessageSuccessTitle, detail: this.successMessageReminderSaved });
    }, err => {
      console.log(err);
      this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessageErrorTitle, detail: this.errorMessageReminderSaveError });
    });
  }


}
