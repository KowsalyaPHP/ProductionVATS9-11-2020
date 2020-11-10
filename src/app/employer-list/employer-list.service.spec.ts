import { TestBed, inject } from '@angular/core/testing';

import { EmployerListService } from './employer-list.service';

describe('EmployerListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployerListService]
    });
  });

  it('should be created', inject([EmployerListService], (service: EmployerListService) => {
    expect(service).toBeTruthy();
  }));
});
