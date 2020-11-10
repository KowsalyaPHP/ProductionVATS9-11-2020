import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryLogsComponent } from './category-logs.component';

describe('CategoryLogsComponent', () => {
  let component: CategoryLogsComponent;
  let fixture: ComponentFixture<CategoryLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
