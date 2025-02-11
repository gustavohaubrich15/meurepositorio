import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaCustomizeComponent } from './textarea-customize.component';

describe('TextareaCustomizeComponent', () => {
  let component: TextareaCustomizeComponent;
  let fixture: ComponentFixture<TextareaCustomizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaCustomizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextareaCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
