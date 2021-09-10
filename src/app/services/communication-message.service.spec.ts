import { TestBed } from '@angular/core/testing';

import { CommunicationMessageService } from './communication-message.service';

describe('CommunicationMessageService', () => {
  let service: CommunicationMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunicationMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
