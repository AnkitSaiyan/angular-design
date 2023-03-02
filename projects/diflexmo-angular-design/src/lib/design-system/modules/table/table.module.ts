import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularResizeEventModule } from 'angular-resize-event';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TableComponent } from './components/table/table.component';
import { TableHeaderCellComponent } from './components/table-header-cell/table-header-cell.component';
import { IconModule } from '../icon/icon.module';
import { TableBodyCellComponent } from './components/table-body-cell/table-body-cell.component';
import { NgDfmCheckboxModule } from '../base-checkbox/base-checkbox.module';

@NgModule({
  declarations: [TableComponent, TableHeaderCellComponent, TableBodyCellComponent],
  imports: [CommonModule, IconModule, AngularResizeEventModule, NgDfmCheckboxModule, FormsModule, InfiniteScrollModule],
  exports: [TableComponent, TableHeaderCellComponent, TableBodyCellComponent],
})
export class TableModule {}
