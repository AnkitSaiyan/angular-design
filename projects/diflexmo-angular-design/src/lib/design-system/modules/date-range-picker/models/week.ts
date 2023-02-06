import { Day } from './day';

export class Week {
  public days: Day[] = [];

  constructor(days: Day[]) {
    this.days = days;
  }
}
