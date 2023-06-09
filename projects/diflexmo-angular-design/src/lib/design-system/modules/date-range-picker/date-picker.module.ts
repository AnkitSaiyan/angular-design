import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { DfmIconModule } from '../icon/icon.module';
import { DfmInputModule } from '../input/input.module';
import { DfmButtonModule } from '../button/button.module';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

@NgModule({
  declarations: [DateRangePickerComponent, DatePickerComponent],
  imports: [CommonModule, DfmIconModule, DfmInputModule, DfmButtonModule, ReactiveFormsModule],
  exports: [DateRangePickerComponent, DatePickerComponent],
})
export class DfmDatePickerModule {}
