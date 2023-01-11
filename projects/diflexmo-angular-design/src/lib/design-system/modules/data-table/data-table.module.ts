import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { IconModule } from '../icon/icon.module';
import { NgModule } from '@angular/core';
import { TableCellComponent } from './components/table-cell/table-cell.component';



@NgModule({
  declarations: [
    DataTableComponent,
    TableCellComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    DataTableComponent,
    TableCellComponent
  ]
})
export class DfmDataTableModule { }
