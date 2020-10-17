import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faHeading, faTint } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { CommunicationType } from 'src/app/model/communicationtype';
import { CommunicationTypeService } from 'src/app/services/communicationtype.service';

@Component({
  selector: 'app-edit-communicationtype',
  templateUrl: './edit-communicationtype.component.html',
  styleUrls: ['./edit-communicationtype.component.scss']
})
export class EditCommunicationtypeComponent implements OnInit {

  errorMessageTitleUpdate: string;
  errorMessageDescriptionUpdate: string;
  selectedCommunicationTypeId: number;
  selectedCommunicationtype: CommunicationType;
  saveCommunicationTypeTitle: string;
  saveCommunicationTypeColorHex: string;

  //Icons
  faHeading = faHeading;
  faTint = faTint;
  faCheck = faCheck;

  constructor(private communicationTypeService: CommunicationTypeService, public translate: TranslateService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.translate.get(['errorMessages.communicationtypeUpdateTitle', 'errorMessages.communicationtypeUpdateDescription']).subscribe(translations => {
      this.errorMessageTitleUpdate = translations['errorMessages.communicationtypeUpdateTitle'];
      this.errorMessageDescriptionUpdate = translations['errorMessages.communicationtypeUpdateDescription'];
    });

    this.route.params.subscribe(params => {
      this.selectedCommunicationTypeId = params.id;
      this.communicationTypeService.getCommunicationTypeById(this.selectedCommunicationTypeId).subscribe((res: CommunicationType) => {
        this.selectedCommunicationtype = res;
        this.loadCommunicationTypeValues(this.selectedCommunicationtype);
      }, err => {
        this.showErrorPage();
      });
    }, err => {
      this.showErrorPage();
    });
  }

  saveCommunicationtype() {
    this.communicationTypeService.addCommunicationType(this.saveCommunicationTypeTitle, this.saveCommunicationTypeColorHex).subscribe(() => {
      this.router.navigate(['/communicationtypes']);
    }, err => {
      this.messageService.add({
        severity: 'error', life: 8000, summary: this.errorMessageTitleUpdate, detail: this.errorMessageDescriptionUpdate
      });
    });
  }

  loadCommunicationTypeValues(communicationtype) {
    this.saveCommunicationTypeTitle = communicationtype.title;
    this.saveCommunicationTypeColorHex = communicationtype.colorHex;
  }

  showErrorPage() {
    this.router.navigate(['/communicationtypes']);
  }

}
