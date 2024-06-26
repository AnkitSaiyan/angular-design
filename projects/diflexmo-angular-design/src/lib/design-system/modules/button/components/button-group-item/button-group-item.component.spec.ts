import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGroupItemComponent } from './button-group-item.component';

describe('ButtonGroupItemComponent', () => {
  let component: ButtonGroupItemComponent;
  let fixture: ComponentFixture<ButtonGroupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonGroupItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
