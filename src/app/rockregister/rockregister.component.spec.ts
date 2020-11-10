import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RockregisterComponent } from './rockregister.component';

describe('RockregisterComponent', () => {
  let component: RockregisterComponent;
  let fixture: ComponentFixture<RockregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RockregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RockregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
