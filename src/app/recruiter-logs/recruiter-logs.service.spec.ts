import { TestBed, inject } from '@angular/core/testing';

import { RecruiterLogsService } from './recruiter-logs.service';

describe('RecruiterLogsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecruiterLogsService]
    });
  });

  it('should be created', inject([RecruiterLogsService], (service: RecruiterLogsService) => {
    expect(service).toBeTruthy();
  }));
});
