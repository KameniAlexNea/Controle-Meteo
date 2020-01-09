import { TestBed } from '@angular/core/testing';

import { DatabaseUserService } from './database-user.service';

describe('DatabaseUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseUserService = TestBed.get(DatabaseUserService);
    expect(service).toBeTruthy();
  });
});
