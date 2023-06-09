import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DfmIconModule } from '../icon/icon.module';
import { DataTableRowCellComponent } from './components/data-table-row-cell/data-table-row-cell.component';
import { DataTableHeaderCellComponent } from './components/data-table-header-cell/data-table-header-cell.component';
import { DfmButtonModule } from '../button/button.module';
import { DfmDropdownModule } from '../dropdown/dropdown.module';
import { DfmCheckboxModule } from '../base-checkbox/base-checkbox.module';
import { DataTableActionComponent } from './components/data-table-action/data-table-action.component';
import { DataTableActionCellComponent } from './components/data-table-action-cell/data-table-action-cell.component';
import { DfmDirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [DataTableComponent, DataTableRowCellComponent, DataTableHeaderCellComponent, DataTableActionComponent, DataTableActionCellComponent],
  imports: [
    CommonModule,
    DfmIconModule,
    DfmButtonModule,
    DfmDropdownModule,
    NgbTooltipModule,
    FormsModule,
    DfmCheckboxModule,
    InfiniteScrollModule,
    NgbDropdownModule,
    DfmDirectivesModule,
  ],
  exports: [DataTableComponent, DataTableRowCellComponent, DataTableActionComponent, DataTableActionCellComponent],
})
export class DfmDataTableModule {}
