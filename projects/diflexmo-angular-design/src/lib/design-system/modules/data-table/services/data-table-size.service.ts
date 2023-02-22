import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTableSizeService {

  private isCurrentOverflown: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private stickyActions: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public isOverflown(): boolean {
    return this.isCurrentOverflown.value;
  }
  
  public isOverflown$(): Observable<boolean> {
    return this.isCurrentOverflown.asObservable();
  }

  public isStickyAtions(): boolean {
    return this.stickyActions.value;
  }
  
  public isStickyAtions$(): Observable<boolean> {
    return this.stickyActions.asObservable();
  }

  public setOverflow(isOverflown: boolean): void {
    this.isCurrentOverflown.next(isOverflown);
  }

  public setStickyActions(isSticky: boolean): void {
    this.stickyActions.next(isSticky);
  }
}
