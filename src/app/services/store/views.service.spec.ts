import { TestBed } from '@angular/core/testing';

import { ViewsService } from './views.service';

describe('ViewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewsService = TestBed.get(ViewsService);
    expect(service).toBeTruthy();
  });
});
