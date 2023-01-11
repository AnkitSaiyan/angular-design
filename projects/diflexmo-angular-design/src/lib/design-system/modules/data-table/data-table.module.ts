import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { IconModule } from '../icon/icon.module';
import { NgModule } from '@angular/core';
import { TableRowCellComponent } from './components/table-row-cell/table-row-cell.component';

@NgModule({
  declarations: [
    DataTableComponent,
    TableRowCellComponent,
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    DataTableComponent,
  ]
})
export class DfmDataTableModule { }
