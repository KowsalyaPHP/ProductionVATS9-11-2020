import { TestBed, inject } from '@angular/core/testing';

import { RegistrationListService } from './registration-list.service';

describe('RegistrationListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationListService]
    });
  });

  it('should be created', inject([RegistrationListService], (service: RegistrationListService) => {
    expect(service).toBeTruthy();
  }));
});
