import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faHeading, faTint } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { CommunicationType } from 'src/app/model/communicationtype';
import { CommunicationTypeService } from 'src/app/services/communicationtype.service';

@Component({
  selector: 'app-communicationtypes',
  templateUrl: './communicationtypes.component.html',
  styleUrls: ['./communicationtypes.component.scss']
})
export class CommunicationtypesComponent implements OnInit {

  errorMessageTitleDelete: string;
  errorMessageDescriptionDelete: string;
  errorMessageTitleAdd: string;
  errorMessageDescriptionAdd: string;
  communicationtypes: CommunicationType[];
  addCommunicationTypeTitle: string;
  addCommunicationTypeColorHex: string;

  //Icons
  faHeading = faHeading;
  faTint = faTint;
  faCheck = faCheck;

  constructor(private communicationTypeService: CommunicationTypeService, public translate: TranslateService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.translate.get(['errorMessages.communicationtypeDeleteTitle', 'errorMessages.communicationtypeDeleteDescription', 'errorMessages.communicationtypeUpdateTitle', 'errorMessages.communicationtypeUpdateDescription', 'errorMessages.communicationtypeSaveTitle', 'errorMessages.communicationtypeSaveDescription']).subscribe(translations => {
      this.errorMessageTitleDelete = translations['errorMessages.communicationtypeDeleteTitle'];
      this.errorMessageDescriptionDelete = translations['errorMessages.communicationtypeDeleteDescription'];
      this.errorMessageTitleAdd = translations['errorMessages.communicationtypeSaveTitle'];
      this.errorMessageDescriptionAdd = translations['errorMessages.communicationtypeSaveDescription'];
    });

    this.communicationTypeService.getAllCommunicationType().subscribe((data: CommunicationType[]) => {
      this.communicationtypes = data;
    }, err => { });
  }

  addCommunicationtype() {
    this.communicationTypeService.addCommunicationType(this.addCommunicationTypeTitle, this.addCommunicationTypeColorHex).subscribe(() => {
      this.router.navigate(['/communicationtypes']);
    }, err => {
      this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessageTitleAdd, detail: this.errorMessageDescriptionAdd });
    });
  }

  editCommunicationtype(communicationtypeid) {
    this.router.navigate([`/editCommunicationtype/edit/${communicationtypeid}`]);
  }

  deleteCommunicationtype(communicationtypeId) {
    this.communicationTypeService.deleteCommunicationType(communicationtypeId).subscribe(() => {
      this.router.navigate(['/communicationtypes']);
    }, err => {
      this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessageTitleDelete, detail: this.errorMessageDescriptionDelete });
    });
  }

}
