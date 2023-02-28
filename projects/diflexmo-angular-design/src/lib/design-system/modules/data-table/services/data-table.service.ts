import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataTableService {
  private isCurrentOverflown: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private stickyActions: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private actions: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public isOverflown(): boolean {
    return this.isCurrentOverflown.value;
  }

  public isOverflown$(): Observable<boolean> {
    return this.isCurrentOverflown.asObservable();
  }

  public hasActions(): boolean {
    return this.actions.value;
  }

  public hasActions$(): Observable<boolean> {
    return this.actions.asObservable();
  }

  public isStickyActions(): boolean {
    return this.stickyActions.value;
  }

  public isStickyActions$(): Observable<boolean> {
    return this.stickyActions.asObservable();
  }

  public setOverflow(isOverflown: boolean): void {
    this.isCurrentOverflown.next(isOverflown);
  }

  public setStickyActions(isSticky: boolean): void {
    this.stickyActions.next(isSticky);
  }

  public setHasActions(isSticky: boolean): void {
    this.actions.next(isSticky);
  }
}
