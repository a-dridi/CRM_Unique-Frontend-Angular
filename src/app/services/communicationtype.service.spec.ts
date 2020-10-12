import { TestBed } from '@angular/core/testing';

import { CommunicationtypeService } from './communicationtype.service';

describe('CommunicationtypeService', () => {
  let service: CommunicationtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunicationtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
