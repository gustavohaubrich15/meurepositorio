import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCustomizeComponent } from './button-customize.component';

describe('ButtonCustomizeComponent', () => {
  let component: ButtonCustomizeComponent;
  let fixture: ComponentFixture<ButtonCustomizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCustomizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
