import { TestBed } from '@angular/core/testing';

import { CurveService } from './curve.service';

describe('CurveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurveService = TestBed.get(CurveService);
    expect(service).toBeTruthy();
  });
});
