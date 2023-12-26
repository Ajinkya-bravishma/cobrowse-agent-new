import { TestBed } from '@angular/core/testing';

import { CobrowseService } from './cobrowse.service';

describe('CobrowseService', () => {
  let service: CobrowseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CobrowseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
