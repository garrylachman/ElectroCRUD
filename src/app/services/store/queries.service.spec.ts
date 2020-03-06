import { TestBed } from '@angular/core/testing';

import { QueriesService } from './queries.service';

describe('QueriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueriesService = TestBed.get(QueriesService);
    expect(service).toBeTruthy();
  });
});
