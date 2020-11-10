import { TestBed, inject } from '@angular/core/testing';
import { EmployerRegistrationService } from './employer-registration.service';

describe('EmployerRegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployerRegistrationService]
    });
  });

  it('should be created', inject([EmployerRegistrationService], (service: EmployerRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
