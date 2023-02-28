import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularResizeEventModule } from 'angular-resize-event';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DataTableComponent } from './components/data-table/data-table.component';
import { IconModule } from '../icon/icon.module';
import { TableRowCellComponent } from './components/table-row-cell/table-row-cell.component';
import { DataTableHeaderCellComponent } from './components/data-table-header-cell/data-table-header-cell.component';
import { ButtonModule } from '../button/button.module';
import { NgDfmDropdownModule } from '../dropdown/dropdown.module';
import { BaseCheckboxModule } from '../base-checkbox/base-checkbox.module';
import { DataTableActionComponent } from './components/data-table-action/data-table-action.component';
import { DataTableActionCellComponent } from './components/data-table-action-cell/data-table-action-cell.component';

@NgModule({
  declarations: [DataTableComponent, TableRowCellComponent, DataTableHeaderCellComponent, DataTableActionComponent, DataTableActionCellComponent],
  imports: [
    CommonModule,
    IconModule,
    AngularResizeEventModule,
    ButtonModule,
    NgDfmDropdownModule,
    NgbTooltipModule,
    FormsModule,
    BaseCheckboxModule,
    InfiniteScrollModule,
    NgbDropdownModule,
  ],
  exports: [DataTableComponent, TableRowCellComponent, DataTableActionComponent, DataTableActionCellComponent],
})
export class DfmDataTableModule {}
