import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationtypesComponent } from './communicationtypes.component';

describe('CommunicationtypesComponent', () => {
  let component: CommunicationtypesComponent;
  let fixture: ComponentFixture<CommunicationtypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationtypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
