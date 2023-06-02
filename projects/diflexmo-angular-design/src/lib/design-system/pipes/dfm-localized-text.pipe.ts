import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Pipe({
  name: 'localizedText'
})
export class LocalizedTextPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {
  }
  public transform(key: string, defaultText: string): Observable<string> {
    return this.translateService.get(key).pipe(
      map((translation) => {
        if (!translation) {
          return defaultText;
        }
        return translation;
      })
    );
  }
}
