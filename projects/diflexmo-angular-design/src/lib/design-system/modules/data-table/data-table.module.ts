import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { IconModule } from '../icon/icon.module';
import { NgModule } from '@angular/core';
import { TableRowCellComponent } from './components/table-row-cell/table-row-cell.component';
import { AngularResizeEventModule } from 'angular-resize-event';
import { DataTableHeaderCellComponent } from './components/data-table-header-cell/data-table-header-cell.component';

@NgModule({
  declarations: [
    DataTableComponent,
    TableRowCellComponent,
    DataTableHeaderCellComponent,
  ],
  imports: [
    CommonModule,
    IconModule,
    AngularResizeEventModule
  ],
  exports: [
    DataTableComponent,
    TableRowCellComponent
  ]
})
export class DfmDataTableModule { }
