import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DfmLocalizationService } from '../services/localization.service';

@Pipe({
  name: 'date',
  pure: false,
})
export class DfmLocalizedDatePipe extends DatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) locale: string, private localizationService: DfmLocalizationService) {
    super(locale);
  }

  public override transform(value: Date | string | number | null | undefined, format?: string, timezone?: string, locale?: string) {
    const dateLocale = locale ?? this.localizationService.getCurrentLocale();
    return super.transform(value, format, timezone, dateLocale) as any;
  }
}
