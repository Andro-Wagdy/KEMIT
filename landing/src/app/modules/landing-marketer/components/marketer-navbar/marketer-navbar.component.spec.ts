import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerNavbarComponent } from './marketer-navbar.component';

describe('MarketerNavbarComponent', () => {
  let component: MarketerNavbarComponent;
  let fixture: ComponentFixture<MarketerNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketerNavbarComponent]
    });
    fixture = TestBed.createComponent(MarketerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
