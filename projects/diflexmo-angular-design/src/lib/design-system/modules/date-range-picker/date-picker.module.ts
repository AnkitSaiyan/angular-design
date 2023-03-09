import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { NgDfmIconModule } from '../icon/icon.module';
import { NgDfmInputModule } from '../input/input.module';
import { NgDfmButtonModule } from '../button/button.module';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

@NgModule({
  declarations: [DateRangePickerComponent, DatePickerComponent],
  imports: [CommonModule, NgDfmIconModule, NgDfmInputModule, NgDfmButtonModule, ReactiveFormsModule],
  exports: [DateRangePickerComponent, DatePickerComponent],
})
export class NgDfmDatePickerModule {}
