import { TestBed } from '@angular/core/testing';

import { Queries.IpcService } from './queries.ipc.service';

describe('Queries.IpcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Queries.IpcService = TestBed.get(Queries.IpcService);
    expect(service).toBeTruthy();
  });
});
