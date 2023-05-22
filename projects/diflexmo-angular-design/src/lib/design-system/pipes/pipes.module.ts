import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DfmLocalizedDatePipe } from './dfm-localized-date.pipe';

@NgModule({
  declarations: [DfmLocalizedDatePipe],
  imports: [CommonModule],
  providers: [DatePipe],
  exports: [DfmLocalizedDatePipe],
})
export class DfmPipesModule {}
