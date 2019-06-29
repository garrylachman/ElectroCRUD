import { TestBed } from '@angular/core/testing';

import { Views.IpcService } from './views.ipc.service';

describe('Views.IpcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Views.IpcService = TestBed.get(Views.IpcService);
    expect(service).toBeTruthy();
  });
});
