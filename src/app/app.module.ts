import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllcustomersComponent } from './components/allcustomers/allcustomers.component';
import { CustomerService } from './services/customer.service';
import { ApiConfig } from './util/api.config';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppLanguageLoaderHelper, AppLanguages } from './util/languages.config';
import { DropdownModule } from 'primeng/dropdown';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipsModule } from 'primeng/chips';
import { AgoDateStringFormatPipe } from './pipe/ago-date-string-format.pipe';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DataViewModule } from 'primeng/dataview';
import { MatListModule } from '@angular/material/list';
import { CommunicationTypeService } from './services/communicationtype.service';
import { Countries } from './util/countries';
import { Timezones } from './util/timezones';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommunicationtypesComponent } from './components/communicationtypes/communicationtypes.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MatDividerModule } from '@angular/material/divider';
import { TabViewModule } from 'primeng/tabview';
import { EditCommunicationtypeComponent } from './components/edit-communicationtype/edit-communicationtype.component';
import { EditCommunicationMessageComponent } from './components/edit-communication-message/edit-communication-message.component';
import { EditCustomerNoteComponent } from './components/edit-customer-note/edit-customer-note.component';
import { MailReminderComponent } from './components/mail-reminder/mail-reminder.component';
import { CalendarModule } from 'primeng/calendar';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AppComponent,
    AllcustomersComponent,
    EditCustomerComponent,
    AgoDateStringFormatPipe,
    AddCustomerComponent,
    CommunicationtypesComponent,
    EditCommunicationtypeComponent,
    EditCommunicationMessageComponent,
    EditCustomerNoteComponent,
    MailReminderComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    MatToolbarModule,
    MatIconModule,
    DropdownModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ChipsModule,
    MatSidenavModule,
    DataViewModule,
    MatListModule,
    FontAwesomeModule,
    ColorPickerModule,
    MatDividerModule,
    TabViewModule,
    CalendarModule,
    AngularEditorModule,
  ],
  providers: [Countries, Timezones, CommunicationTypeService, CustomerService, ApiConfig, TranslateService, AppLanguages, AppLanguageLoaderHelper, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}