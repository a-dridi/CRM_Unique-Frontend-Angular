import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllcustomersComponent } from './components/allcustomers/allcustomers.component';


const routes: Routes = [
  { path: 'customers', component: AllcustomersComponent },
  { path: '', redirectTo: 'customers', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
