import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { DfmIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, DfmIconModule],
  exports: [CardComponent],
})
export class DfmCardModule {}
