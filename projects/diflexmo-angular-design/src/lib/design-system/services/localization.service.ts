import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DfmLocalizationService {
  private currentLocale: BehaviorSubject<string>;

  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.currentLocale = new BehaviorSubject(locale);
  }

  public setCurrentLocale(locale: string): void {
    this.currentLocale.next(locale);
  }

  public getCurrentLocale(): string {
    return this.currentLocale.value;
  }

  public getCurrentLocale$(): Observable<string> {
    return this.currentLocale.asObservable();
  }
}
