import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCustomizeComponent } from './input-customize.component';

describe('InputCustomizeComponent', () => {
  let component: InputCustomizeComponent;
  let fixture: ComponentFixture<InputCustomizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCustomizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
