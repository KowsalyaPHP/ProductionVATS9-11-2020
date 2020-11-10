import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterLogsComponent } from './recruiter-logs.component';

describe('RecruiterLogsComponent', () => {
  let component: RecruiterLogsComponent;
  let fixture: ComponentFixture<RecruiterLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
