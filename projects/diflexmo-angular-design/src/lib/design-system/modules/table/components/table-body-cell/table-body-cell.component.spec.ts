import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBodyCellComponent } from './table-body-cell.component';

describe('TableBodyCellComponent', () => {
  let component: TableBodyCellComponent;
  let fixture: ComponentFixture<TableBodyCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableBodyCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableBodyCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
