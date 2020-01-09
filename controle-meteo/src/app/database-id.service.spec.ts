import { TestBed } from '@angular/core/testing';

import { DatabaseIdService } from './database-id.service';

describe('DatabaseIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseIdService = TestBed.get(DatabaseIdService);
    expect(service).toBeTruthy();
  });
});
