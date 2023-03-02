import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag.component';
import { NgDfmIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [TagComponent],
  imports: [CommonModule, NgDfmIconModule],
  exports: [TagComponent],
})
export class TagModule {}
