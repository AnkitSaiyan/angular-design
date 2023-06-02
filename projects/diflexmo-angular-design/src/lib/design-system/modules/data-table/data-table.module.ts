import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularResizeEventModule } from 'angular-resize-event';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DataTableComponent } from './components/data-table/data-table.component';
import { NgDfmIconModule } from '../icon/icon.module';
import { DataTableRowCellComponent } from './components/data-table-row-cell/data-table-row-cell.component';
import { DataTableHeaderCellComponent } from './components/data-table-header-cell/data-table-header-cell.component';
import { NgDfmButtonModule } from '../button/button.module';
import { NgDfmDropdownModule } from '../dropdown/dropdown.module';
import { NgDfmCheckboxModule } from '../base-checkbox/base-checkbox.module';
import { DataTableActionComponent } from './components/data-table-action/data-table-action.component';
import { DataTableActionCellComponent } from './components/data-table-action-cell/data-table-action-cell.component';

@NgModule({
  declarations: [DataTableComponent, DataTableRowCellComponent, DataTableHeaderCellComponent, DataTableActionComponent, DataTableActionCellComponent],
  imports: [
    CommonModule,
    NgDfmIconModule,
    AngularResizeEventModule,
    NgDfmButtonModule,
    NgDfmDropdownModule,
    NgbTooltipModule,
    FormsModule,
    NgDfmCheckboxModule,
    InfiniteScrollModule,
    NgbDropdownModule,
  ],
  exports: [DataTableComponent, DataTableRowCellComponent, DataTableActionComponent, DataTableActionCellComponent],
})
export class NgDfmDataTableModule {}
