import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSocialMediaComponent } from './modal-social-media.component';

describe('ModalSocialMediaComponent', () => {
  let component: ModalSocialMediaComponent;
  let fixture: ComponentFixture<ModalSocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSocialMediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
