import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { DfmIconModule } from '../icon/icon.module';
import { DfmErrorModule } from '../error/error.module';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DfmIconModule, DfmErrorModule],
  exports: [InputComponent],
})
export class DfmInputModule {}
