import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationItemTenantComponent } from './navigation-item-tenant.component';

describe('NavigationItemTenantComponent', () => {
  let component: NavigationItemTenantComponent;
  let fixture: ComponentFixture<NavigationItemTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationItemTenantComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationItemTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
