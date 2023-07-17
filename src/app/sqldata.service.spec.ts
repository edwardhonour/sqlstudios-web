import { TestBed } from '@angular/core/testing';

import { SQLDataService } from './sqldata.service';

describe('SQLDataService', () => {
  let service: SQLDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SQLDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
