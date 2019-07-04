import { TestBed } from '@angular/core/testing';

import { SliderGaurdService } from './slider-gaurd.service';

describe('SliderGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SliderGaurdService = TestBed.get(SliderGaurdService);
    expect(service).toBeTruthy();
  });
});
