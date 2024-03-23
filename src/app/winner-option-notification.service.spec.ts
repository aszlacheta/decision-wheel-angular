import { TestBed } from '@angular/core/testing';

import { WinnerOptionNotificationService } from './winner-option-notification.service';

describe('WinnerOptionNotificationService', () => {
  let service: WinnerOptionNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinnerOptionNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
