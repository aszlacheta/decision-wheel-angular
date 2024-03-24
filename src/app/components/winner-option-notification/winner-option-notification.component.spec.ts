import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerOptionNotificationComponent } from './winner-option-notification.component';

describe('WinnerOptionNotificationComponent', () => {
  let component: WinnerOptionNotificationComponent;
  let fixture: ComponentFixture<WinnerOptionNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnerOptionNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WinnerOptionNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
