import { TestBed, inject } from '@angular/core/testing';

import { RockregisterService } from './rockregister.service';

describe('RockregisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RockregisterService]
    });
  });

  it('should be created', inject([RockregisterService], (service: RockregisterService) => {
    expect(service).toBeTruthy();
  }));
});
