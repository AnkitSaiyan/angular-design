import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedIconComponent } from './featured-icon.component';

describe('FeaturedIconComponent', () => {
  let component: FeaturedIconComponent;
  let fixture: ComponentFixture<FeaturedIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
