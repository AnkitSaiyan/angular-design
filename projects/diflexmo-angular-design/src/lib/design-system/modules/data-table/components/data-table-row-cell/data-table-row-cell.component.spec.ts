import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableRowCellComponent } from './data-table-row-cell.component';

describe('DataTableRowCellComponent', () => {
  let component: DataTableRowCellComponent;
  let fixture: ComponentFixture<DataTableRowCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableRowCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableRowCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
