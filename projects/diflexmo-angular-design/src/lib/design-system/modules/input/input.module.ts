import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { NgDfmIconModule } from '../icon/icon.module';
import { NgDfmErrorModule } from '../error/error.module';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgDfmIconModule, NgDfmErrorModule],
  exports: [InputComponent],
})
export class NgDfmInputModule {}
