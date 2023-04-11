import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';
import { NgDfmErrorModule } from '../error/error.module';

@NgModule({
  declarations: [TextAreaComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgDfmErrorModule],
  exports: [TextAreaComponent],
})
export class NgDfmTextAreaModule {}
