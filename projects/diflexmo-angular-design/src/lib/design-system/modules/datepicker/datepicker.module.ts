import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatepickerComponent } from './datepicker.component';
import { InputModule } from '../input/input.module';
import { NgDfmButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [DatepickerComponent],
  imports: [CommonModule, InputModule, NgDfmButtonModule, ReactiveFormsModule, IconModule],
  exports: [DatepickerComponent],
})
export class DatepickerModule {}
