import { TestBed } from '@angular/core/testing';

import { ObstaclePaintService } from './obstacle-paint.service';

describe('ObstaclePaintService', () => {
  let service: ObstaclePaintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObstaclePaintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
