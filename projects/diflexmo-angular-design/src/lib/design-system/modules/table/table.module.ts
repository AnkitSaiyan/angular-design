import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularResizeEventModule } from 'angular-resize-event';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { TableHeaderCellComponent } from './components/table-header-cell/table-header-cell.component';
import { IconModule } from '../icon/icon.module';
import { TableBodyCellComponent } from './components/table-body-cell/table-body-cell.component';
import { BaseCheckboxModule } from '../base-checkbox/base-checkbox.module';

@NgModule({
  declarations: [TableComponent, TableHeaderCellComponent, TableBodyCellComponent],
  imports: [CommonModule, IconModule, AngularResizeEventModule, BaseCheckboxModule, FormsModule],
  exports: [TableComponent, TableHeaderCellComponent, TableBodyCellComponent],
})
export class TableModule {}
