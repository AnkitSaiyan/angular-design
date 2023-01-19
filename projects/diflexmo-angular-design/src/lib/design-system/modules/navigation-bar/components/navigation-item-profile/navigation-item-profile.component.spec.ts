import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationItemProfileComponent } from './navigation-item-profile.component';

describe('NavigationItemProfileComponent', () => {
  let component: NavigationItemProfileComponent;
  let fixture: ComponentFixture<NavigationItemProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationItemProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationItemProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
