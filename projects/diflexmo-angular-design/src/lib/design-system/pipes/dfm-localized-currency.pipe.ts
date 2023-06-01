import { CurrencyPipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DfmLocalizationService } from '../services/localization.service';

@Pipe({
  name: 'currency',
})
export class DfmLocalizedCurrencyPipe extends CurrencyPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) locale: string, private localizationService: DfmLocalizationService) {
    super(locale);
  }

  public override transform(
    value: number | string | null | undefined,
    currencyCode?: string,
    display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean,
    digitsInfo?: string,
    locale?: string,
  ) {
    const dateLocale = locale ?? this.localizationService.getCurrentLocale();
    return super.transform(value, currencyCode, display, digitsInfo, dateLocale) as any;
  }
}
