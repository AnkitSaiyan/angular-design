export class Day {
  public date: Date = new Date();

  public isCurrentMonth: boolean = false;

  constructor(newDate: Date, isCurrentMonth: boolean = false) {
    this.date = newDate;
    this.isCurrentMonth = isCurrentMonth;
  }
}
