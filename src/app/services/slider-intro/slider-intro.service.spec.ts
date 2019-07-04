import { TestBed } from '@angular/core/testing';

import { SliderIntroService } from './slider-intro.service';

describe('SliderIntroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SliderIntroService = TestBed.get(SliderIntroService);
    expect(service).toBeTruthy();
  });
});
