import { TestBed } from '@angular/core/testing';

import { WheelSoundsService } from './wheel-sounds.service';

describe('WheelSoundsService', () => {
  let service: WheelSoundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WheelSoundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
