import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerMainComponent } from './marketer-main.component';

describe('MarketerMainComponent', () => {
  let component: MarketerMainComponent;
  let fixture: ComponentFixture<MarketerMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketerMainComponent]
    });
    fixture = TestBed.createComponent(MarketerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
