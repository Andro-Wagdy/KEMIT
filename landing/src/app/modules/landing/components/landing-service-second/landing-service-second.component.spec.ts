import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingServiceSecondComponent } from './landing-service-second.component';

describe('LandingServiceSecondComponent', () => {
  let component: LandingServiceSecondComponent;
  let fixture: ComponentFixture<LandingServiceSecondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingServiceSecondComponent]
    });
    fixture = TestBed.createComponent(LandingServiceSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
