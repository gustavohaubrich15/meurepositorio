import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDevComponent } from './card-dev.component';

describe('CardDevComponent', () => {
  let component: CardDevComponent;
  let fixture: ComponentFixture<CardDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
