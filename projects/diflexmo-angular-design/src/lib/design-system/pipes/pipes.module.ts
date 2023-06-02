import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { DfmLocalizedDatePipe } from './dfm-localized-date.pipe';
import { DfmLocalizedCurrencyPipePipe } from './dfm-localized-currency-pipe.pipe';
import { DfmLocalizedDecimalPipePipe } from './dfm-localized-decimal-pipe.pipe';
import { DfmLocalizedPercentPipePipe } from './dfm-localized-percent-pipe.pipe';
import { LocalizedTextPipe } from "./dfm-localized-text.pipe";

@NgModule({
  declarations: [DfmLocalizedDatePipe, DfmLocalizedCurrencyPipePipe, DfmLocalizedDecimalPipePipe, DfmLocalizedPercentPipePipe, LocalizedTextPipe],
  imports: [CommonModule],
  providers: [DatePipe, CurrencyPipe, DecimalPipe],
  exports: [DfmLocalizedDatePipe, DfmLocalizedCurrencyPipePipe, DfmLocalizedDecimalPipePipe, DfmLocalizedPercentPipePipe, LocalizedTextPipe],
})
export class DfmPipesModule {}
