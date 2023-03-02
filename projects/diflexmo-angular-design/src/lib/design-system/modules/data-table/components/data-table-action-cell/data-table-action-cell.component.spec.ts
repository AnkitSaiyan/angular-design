import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableActionCellComponent } from './data-table-action-cell.component';

describe('DataTableActionCellComponent', () => {
  let component: DataTableActionCellComponent;
  let fixture: ComponentFixture<DataTableActionCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableActionCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableActionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
