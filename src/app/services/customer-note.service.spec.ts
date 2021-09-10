import { TestBed } from '@angular/core/testing';

import { CustomerNoteService } from './customer-note.service';

describe('CustomerNoteService', () => {
  let service: CustomerNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
