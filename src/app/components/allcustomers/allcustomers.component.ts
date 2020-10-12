import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Customer } from 'src/app/model/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { Countries } from 'src/app/util/countries';

@Component({
  selector: 'app-allcustomers',
  templateUrl: './allcustomers.component.html',
  styleUrls: ['./allcustomers.component.scss']
})
export class AllcustomersComponent implements OnInit {

  customers: Customer[];
  errorMessagedeleteCustomerTitle;
  errorMessagedeleteCustomerDescription;


  constructor(private customerService: CustomerService, public translate: TranslateService, private messageService: MessageService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.translate.get(['errorMessages.allCustomersDeleteTitle', 'errorMessages.allCustomersDeleteDescription']).subscribe(translations => {
      this.errorMessagedeleteCustomerTitle = translations['errorMessages.allCustomersDeleteTitle'];
      this.errorMessagedeleteCustomerDescription = translations['errorMessages.allCustomersDeleteDescription'];
    });
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
    });
  }

  editCustomer(id) {
    this.router.navigate([`/customer/edit/${id}`]);
  }

  deleteCustomer(id) {
    this.customerService.deleteCustomer(id).subscribe(
      () => {
      },
      err => {
        this.messageService.add({ severity: 'error', life: 8000, summary: this.errorMessagedeleteCustomerTitle, detail: this.errorMessagedeleteCustomerDescription });
      });
  }

  openAddCustomerPage() {
    this.router.navigate([`/customer/add`]);
  }

}
