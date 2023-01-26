import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationItemEventsComponent } from './navigation-item-events.component';

describe('NavigationItemEventsComponent', () => {
  let component: NavigationItemEventsComponent;
  let fixture: ComponentFixture<NavigationItemEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationItemEventsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationItemEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
