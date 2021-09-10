import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerNoteComponent } from './edit-customer-note.component';

describe('EditCustomerNoteComponent', () => {
  let component: EditCustomerNoteComponent;
  let fixture: ComponentFixture<EditCustomerNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCustomerNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
