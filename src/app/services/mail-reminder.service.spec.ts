import { TestBed } from '@angular/core/testing';

import { MailReminderService } from './mail-reminder.service';

describe('MailReminderService', () => {
  let service: MailReminderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailReminderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
