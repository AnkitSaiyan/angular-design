import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationItemEventComponent } from './navigation-item-event.component';

describe('NavigationItemEventComponent', () => {
  let component: NavigationItemEventComponent;
  let fixture: ComponentFixture<NavigationItemEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationItemEventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationItemEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
