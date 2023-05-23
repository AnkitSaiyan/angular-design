import { PercentPipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DfmLocalizationService } from '../services/localization.service';

@Pipe({
  name: 'percent',
})
export class DfmLocalizedPercentPipePipe extends PercentPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) locale: string, private localizationService: DfmLocalizationService) {
    super(locale);
  }

  public override transform(value: number | string | null | undefined, digitsInfo?: string, locale?: string) {
    const dateLocale = locale ?? this.localizationService.getCurrentLocale();
    return super.transform(value, digitsInfo, dateLocale) as any;
  }
}
