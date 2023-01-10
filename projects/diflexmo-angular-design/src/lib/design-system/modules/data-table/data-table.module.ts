import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { IconModule } from '../icon/icon.module';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
    DataTableComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    DataTableComponent
  ]
})
export class DfmDataTableModule { }
