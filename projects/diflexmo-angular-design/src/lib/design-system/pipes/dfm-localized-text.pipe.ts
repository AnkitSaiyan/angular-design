import { Optional, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'localizedText',
})
export class DfmLocalizedTextPipe implements PipeTransform {
  constructor(@Optional() private translateService: TranslateService) {}

  public transform(key: string, defaultText: string): Observable<string> {
    if (!this.translateService) {
      return of(defaultText);
    }

    return this.translateService.get(key).pipe(
      map((translation) => {
        if (!translation || translation === key) {
          return defaultText;
        }
        return translation;
      }),
    );
  }
}
