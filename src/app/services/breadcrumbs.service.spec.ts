import { TestBed } from '@angular/core/testing';

import { BreadcrumbsService } from './breadcrumbs.service';

describe('BreadcrumbsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BreadcrumbsService = TestBed.get(BreadcrumbsService);
    expect(service).toBeTruthy();
  });
});
