import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { NgDfmIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, NgDfmIconModule],
  exports: [CardComponent],
})
export class NgDfmCardModule {}
