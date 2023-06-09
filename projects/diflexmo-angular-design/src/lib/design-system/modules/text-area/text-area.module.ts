import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';
import { DfmErrorModule } from '../error/error.module';

@NgModule({
  declarations: [TextAreaComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DfmErrorModule],
  exports: [TextAreaComponent],
})
export class DfmTextAreaModule {}
