import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Day } from '../../models/day';
import { Week } from '../../models/week';
import { weekCount } from '../../utils/week-count';

@Component({
  selector: 'dfm-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  public month: Date;

  public weeks: Week[];

  public weekNames: string[];

  @Input() public selectedDate?: Date;

  @Output() public dateSelected: EventEmitter<Date> = new EventEmitter();

  constructor() {
    this.month = new Date();
    this.weeks = [];
    this.weekNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'];
  }

  ngOnInit(): void {
    this.setWeeks();
  }

  public setWeeks() {
    const month = this.month.getMonth();
    const year = this.month.getFullYear();

    // let firstDay = 0;
    let monthRows = 0;

    // firstDay = this.getFirstDayOfMonthIndex(month, year);

    monthRows = weekCount(year, month);
    const firstDate = new Date(year, month, 1);
    let dayInMonth = 1;
    for (let i = 0; i < monthRows; i += 1) {
      const days: Day[] = [];

      for (let j = 0; j < 7; j += 1) {
        if (i === 0) {
          if (j < firstDate.getDay() - 1) {
            const day = new Date(year, month, 0);
            const dayNumber = day.getDate() - (firstDate.getDay() - 2 - j);
            day.setDate(dayNumber);
            days.push(new Day(day));
          } else {
            const date = new Date(year, month, dayInMonth);
            const isCurrentMonth = date.getMonth() === month;
            days.push(new Day(date, isCurrentMonth));
            dayInMonth += 1;
          }
        } else {
          const date = new Date(year, month, dayInMonth);
          const isCurrentMonth = date.getMonth() === month;
          days.push(new Day(date, isCurrentMonth));
          dayInMonth += 1;
        }
      }

      const week = new Week(days);
      this.weeks.push(week);
    }
  }

  public previousMonth(): void {
    this.month.setMonth(this.month.getMonth() - 1);
    this.month = new Date(this.month);
    this.setWeeks();
  }

  public nextMonth(): void {
    this.month.setMonth(this.month.getMonth() + 1);
    this.month = new Date(this.month);
    this.setWeeks();
  }

  public isSelectedDate(date: Date): boolean {
    return this.selectedDate?.getTime() === date.getTime();
  }

  public selectDate(date: Date): void {
    this.selectedDate = date;
    this.dateSelected.next(date);
  }

  public isToday(month: number, date: Date): boolean {
    const today = new Date();

    return (
      month === date.getMonth() &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  private getFirstDayOfMonthIndex(month: number, year: number): number {
    const day = new Date();
    day.setDate(1);
    day.setMonth(month);
    day.setFullYear(year);

    const dayIndex = day.getDay() + 7;
    return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
  }
}
