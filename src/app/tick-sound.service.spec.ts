import { TestBed } from '@angular/core/testing';

import { TickSoundService } from './tick-sound.service';

describe('TickSoundService', () => {
  let service: TickSoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TickSoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
