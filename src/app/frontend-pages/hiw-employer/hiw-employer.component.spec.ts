import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiwEmployerComponent } from './hiw-employer.component';

describe('HiwEmployerComponent', () => {
  let component: HiwEmployerComponent;
  let fixture: ComponentFixture<HiwEmployerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiwEmployerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiwEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
