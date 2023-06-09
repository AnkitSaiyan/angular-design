import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag.component';
import { DfmIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [TagComponent],
  imports: [CommonModule, DfmIconModule],
  exports: [TagComponent],
})
export class DfmTagModule {}
