import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataTableService {
  public isCurrentOverflown$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public hasStickyActions$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public hasActions$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public setOverflow(isOverflown: boolean): void {
    this.isCurrentOverflown$.next(isOverflown);
  }

  public setStickyActions(isSticky: boolean): void {
    this.hasStickyActions$.next(isSticky);
  }

  public setHasActions(isSticky: boolean): void {
    this.hasActions$.next(isSticky);
  }
}
