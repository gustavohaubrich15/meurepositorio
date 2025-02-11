import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBasicInfoComponent } from './modal-basic-info.component';

describe('ModalBasicInfoComponent', () => {
  let component: ModalBasicInfoComponent;
  let fixture: ComponentFixture<ModalBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBasicInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
