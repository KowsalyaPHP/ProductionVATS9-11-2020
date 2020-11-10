import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiwPartnersComponent } from './hiw-partners.component';

describe('HiwPartnersComponent', () => {
  let component: HiwPartnersComponent;
  let fixture: ComponentFixture<HiwPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiwPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiwPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
