import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTextareaComponent } from './card-textarea.component';

describe('OptionComponent', () => {
  let component: CardTextareaComponent;
  let fixture: ComponentFixture<CardTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
