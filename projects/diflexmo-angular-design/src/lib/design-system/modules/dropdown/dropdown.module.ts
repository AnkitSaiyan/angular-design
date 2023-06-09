import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownButtonComponent } from './components/dropdown-button/dropdown-button.component';
import { DfmIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [DropdownButtonComponent],
  imports: [CommonModule, NgbDropdownModule, DfmIconModule, NgbTooltipModule],
  exports: [DropdownButtonComponent],
})
export class DfmDropdownModule {}
