import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommunicationMessageComponent } from './edit-communication-message.component';

describe('EditCommunicationMessageComponent', () => {
  let component: EditCommunicationMessageComponent;
  let fixture: ComponentFixture<EditCommunicationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommunicationMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommunicationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
