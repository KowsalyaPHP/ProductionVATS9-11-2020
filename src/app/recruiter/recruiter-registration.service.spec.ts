import { TestBed, inject } from '@angular/core/testing';

import { RecruiterRegistrationService } from './recruiter-registration.service';

describe('RecruiterRegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecruiterRegistrationService]
    });
  });

  it('should be created', inject([RecruiterRegistrationService], (service: RecruiterRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
