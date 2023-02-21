import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTableSizeService {

  private isCurrentOverflown: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public isOverflown(): boolean {
    return this.isCurrentOverflown.value;
  }

  public setOverflow(isOverflown: boolean): void {
    this.isCurrentOverflown.next(isOverflown);
  }
}
