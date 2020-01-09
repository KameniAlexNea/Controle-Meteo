import { TestBed } from '@angular/core/testing';

import { DatabaseLocationService } from './database-location.service';

describe('DatabaseLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseLocationService = TestBed.get(DatabaseLocationService);
    expect(service).toBeTruthy();
  });
});
