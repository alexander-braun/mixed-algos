import { TestBed } from '@angular/core/testing';

import { GridOptionsService } from './grid-options.service';

describe('GridOptionsService', () => {
  let service: GridOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
