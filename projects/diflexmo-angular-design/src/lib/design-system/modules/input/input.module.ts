import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { IconModule } from '../icon/icon.module';
import { ErrorModule } from '../error/error.module';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconModule, ErrorModule],
  exports: [InputComponent],
})
export class InputModule {}
