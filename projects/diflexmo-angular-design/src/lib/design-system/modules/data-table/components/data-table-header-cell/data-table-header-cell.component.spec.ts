import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableHeaderCellComponent } from './data-table-header-cell.component';

describe('DataTableHeaderCellComponent', () => {
  let component: DataTableHeaderCellComponent;
  let fixture: ComponentFixture<DataTableHeaderCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableHeaderCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableHeaderCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
