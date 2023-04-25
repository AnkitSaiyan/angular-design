import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimeNotationEnum } from '../models/time-notation.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private readonly time24Hour: string = 'HH:mm';

  private readonly time12Hour: string = 'hh:mm a';

  private readonly dateStandard: string = 'dd/MM/yyyy';

  private timeNotation: BehaviorSubject<TimeNotationEnum> = new BehaviorSubject<TimeNotationEnum>(TimeNotationEnum.Hour12);

  public setTimeNotation(notation: TimeNotationEnum): void {
    this.timeNotation.next(notation);
  }

  public getTimeNotation(): TimeNotationEnum {
    return this.timeNotation.value;
  }

  public getTimeNotation$(): Observable<TimeNotationEnum> {
    return this.timeNotation.asObservable();
  }

  public getTimeNotationFormat(): string {
    switch (this.timeNotation.value) {
      case TimeNotationEnum.Hour12:
        return this.time12Hour;
      case TimeNotationEnum.Hour24:
        return this.time24Hour;
      default:
        return this.time12Hour;
    }
  }

  public getStandardDateFormat(): string {
    return `${this.dateStandard} ${this.getTimeNotationFormat()}`;
  }
}
