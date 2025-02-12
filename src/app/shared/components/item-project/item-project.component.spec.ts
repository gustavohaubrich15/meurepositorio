import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProjectComponent } from './item-project.component';

describe('ItemProjectComponent', () => {
  let component: ItemProjectComponent;
  let fixture: ComponentFixture<ItemProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
