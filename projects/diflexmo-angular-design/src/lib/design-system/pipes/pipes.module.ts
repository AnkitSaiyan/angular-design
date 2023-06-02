import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { DfmLocalizedDatePipe } from './dfm-localized-date.pipe';
import { DfmLocalizedCurrencyPipe } from './dfm-localized-currency.pipe';
import { DfmLocalizedDecimalPipe } from './dfm-localized-decimal.pipe';
import { DfmLocalizedPercentPipe } from './dfm-localized-percent.pipe';
import { DfmLocalizedTextPipe } from './dfm-localized-text.pipe';

@NgModule({
  declarations: [DfmLocalizedDatePipe, DfmLocalizedCurrencyPipe, DfmLocalizedDecimalPipe, DfmLocalizedPercentPipe, DfmLocalizedTextPipe],
  imports: [CommonModule],
  providers: [DatePipe, CurrencyPipe, DecimalPipe],
  exports: [DfmLocalizedDatePipe, DfmLocalizedCurrencyPipe, DfmLocalizedDecimalPipe, DfmLocalizedPercentPipe, DfmLocalizedTextPipe],
})
export class DfmPipesModule {}
