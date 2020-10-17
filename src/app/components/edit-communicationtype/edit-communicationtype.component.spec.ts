import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommunicationtypeComponent } from './edit-communicationtype.component';

describe('EditCommunicationtypeComponent', () => {
  let component: EditCommunicationtypeComponent;
  let fixture: ComponentFixture<EditCommunicationtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommunicationtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommunicationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
