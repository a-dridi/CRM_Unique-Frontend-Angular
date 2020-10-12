import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AllcustomersComponent } from './components/allcustomers/allcustomers.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';


const routes: Routes = [
  { path: 'customers', component: AllcustomersComponent },
  { path: 'customer/add', component: AddCustomerComponent },
  { path: 'customer/edit/{id}', component: EditCustomerComponent },
  { path: '', redirectTo: 'customers', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
