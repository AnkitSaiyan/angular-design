import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { IconModule } from '../icon/icon.module';
import { InputModule } from '../input/input.module';
import { ButtonModule } from '../button/button.module';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

@NgModule({
  declarations: [DateRangePickerComponent, DatePickerComponent],
  imports: [CommonModule, IconModule, InputModule, ButtonModule, ReactiveFormsModule],
  exports: [DateRangePickerComponent, DatePickerComponent],
})
export class NgDfmDatePickerModule {}
