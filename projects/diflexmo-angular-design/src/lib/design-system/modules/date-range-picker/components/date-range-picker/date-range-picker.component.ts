import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppliedDates } from '../../models/applied-dates';
import { Day } from '../../models/day';
import { Week } from '../../models/week';
import { weekCount } from '../../utils/week-count';

@Component({
  selector: 'dfm-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent implements OnInit {
  @Output() public datesApplied: EventEmitter<AppliedDates> = new EventEmitter();

  @Output() public cancelled: EventEmitter<boolean> = new EventEmitter();

  public firstMonth: Date;

  public secondMonth: Date;

  public firstMonthWeeks: Week[];

  public secondMonthWeeks: Week[];

  private privateFirstSelectedDate: Date | undefined;

  public get firstSelectedDate(): Date | undefined {
    return this.privateFirstSelectedDate;
  }

  @Input() public set firstSelectedDate(value: Date | undefined) {
    this.privateFirstSelectedDate = value;
    this.dateRange.controls['startDate'].setValue(value || null);
  }

  private privateSecondSelectedDate: Date | undefined;

  public get secondSelectedDate(): Date | undefined {
    return this.privateSecondSelectedDate;
  }

  @Input() public set secondSelectedDate(value: Date | undefined) {
    this.privateSecondSelectedDate = value;
    this.dateRange.controls['endDate'].setValue(value || null);
  }

  public dateRange: FormGroup;

  public weekNames: string[];

  constructor() {
    this.dateRange = new FormGroup({
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null),
    });

    this.weekNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'];
    this.firstMonthWeeks = [];
    this.secondMonthWeeks = [];

    this.firstMonth = new Date();
    this.secondMonth = new Date();
  }

  ngOnInit(): void {
    this.secondMonth.setMonth(new Date().getMonth() + 1);
    this.setWeeks();
  }

  public setWeeks() {
    const month = this.firstMonth.getMonth();
    const year = this.firstMonth.getFullYear();
    const daysInFirstMonth = new Date(year, month, 0).getDate();

    const secondMonth = this.secondMonth.getMonth();
    const secondYear = this.secondMonth.getFullYear();
    const daysInSecondMonth = new Date(year, month, 0).getDate();

    let firstDay = 0;
    let monthRows = 0;
    if (daysInFirstMonth >= daysInSecondMonth) {
      firstDay = DateRangePickerComponent.getFirstDayOfMonthIndex(month, year);
      monthRows = Math.ceil((daysInFirstMonth + firstDay) / 7);
    } else {
      firstDay = DateRangePickerComponent.getFirstDayOfMonthIndex(secondMonth, secondYear);
      monthRows = Math.ceil((daysInSecondMonth + firstDay) / 7);
    }

    const weeks = weekCount(year, month);
    const weeksSecondMonth = weekCount(secondYear, secondMonth);
    if (weeks > weeksSecondMonth) {
      monthRows = weeks;
    } else {
      monthRows = weeksSecondMonth;
    }

    let dayInMonth = 1;
    let dayInSecondMonth = 1;
    const firstDate = new Date(year, month, 1);
    const firstDateSecondMonth = new Date(year, secondMonth, 1);
    this.firstMonthWeeks = [];
    this.secondMonthWeeks = [];
    for (let i = 0; i < monthRows; i += 1) {
      const days: Day[] = [];
      const secondMonthDays: Day[] = [];

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
          if (j < firstDateSecondMonth.getDay() - 1) {
            const day2 = new Date(secondYear, secondMonth, 0);
            const day2Number = day2.getDate() - (firstDateSecondMonth.getDay() - 2 - j);
            day2.setDate(day2Number);
            secondMonthDays.push(new Day(day2));
          } else {
            secondMonthDays.push(new Day(new Date(secondYear, secondMonth, dayInSecondMonth), true));
            dayInSecondMonth += 1;
          }
        } else {
          const date = new Date(year, month, dayInMonth);
          const isCurrentMonth = date.getMonth() === month;
          days.push(new Day(date, isCurrentMonth));
          dayInMonth += 1;
          const date2 = new Date(secondYear, secondMonth, dayInSecondMonth);
          const isCurrentMonth2 = date2.getMonth() === secondMonth;
          secondMonthDays.push(new Day(date2, isCurrentMonth2));
          dayInSecondMonth += 1;
        }
      }

      const week = new Week(days);
      const week2 = new Week(secondMonthDays);
      this.firstMonthWeeks.push(week);
      this.secondMonthWeeks.push(week2);
    }
  }

  public static getFirstDayOfMonthIndex(month: number, year: number): number {
    const day = new Date();
    day.setDate(1);
    day.setMonth(month);
    day.setFullYear(year);

    const dayIndex = day.getDay() + 7;
    return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
  }

  public isSelectedDate(date: Date): boolean {
    return this.firstSelectedDate?.getTime() === date.getTime() || this.secondSelectedDate?.getTime() === date.getTime();
  }

  public isBetweenSelection(date: Date): boolean {
    if (!this.firstSelectedDate || !this.secondSelectedDate || !date) {
      return false;
    }

    return this.firstSelectedDate < date && this.secondSelectedDate > date;
  }

  public selectDate(date: Date): void {
    if (!date) {
      return;
    }

    if (this.secondSelectedDate && date === this.secondSelectedDate) {
      this.secondSelectedDate = undefined;
      return;
    }

    if (this.firstSelectedDate && this.firstSelectedDate === date) {
      this.firstSelectedDate = undefined;
      if (this.secondSelectedDate) {
        this.firstSelectedDate = this.secondSelectedDate;
        this.secondSelectedDate = undefined;
      }
      return;
    }

    if (!this.firstSelectedDate) {
      this.firstSelectedDate = date;
    }

    if (this.firstSelectedDate > date) {
      if (!this.secondSelectedDate) {
        this.secondSelectedDate = this.firstSelectedDate;
      }
      this.firstSelectedDate = date;
    }

    if (date > this.firstSelectedDate) {
      this.secondSelectedDate = date;
    }
  }

  public cancel(): void {
    this.cancelled.next(true);
  }

  public today(): void {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    this.firstSelectedDate = date;
    this.secondSelectedDate = date;
    this.datesApplied.next({ startDate: date, stopDate: date });
  }

  public yesterday(): void {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - 1);
    this.firstSelectedDate = date;
    this.secondSelectedDate = date;
    this.datesApplied.next({ startDate: date, stopDate: date });
  }

  public thisMonth(): void {
    const date = new Date();
    this.firstSelectedDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.secondSelectedDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.datesApplied.next({ startDate: this.firstSelectedDate, stopDate: this.secondSelectedDate });
  }

  public lastMonth(): void {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    this.firstSelectedDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.secondSelectedDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.datesApplied.next({ startDate: this.firstSelectedDate, stopDate: this.secondSelectedDate });
  }

  public thisYear(): void {
    const date = new Date();
    this.firstSelectedDate = new Date(date.getFullYear(), 0, 1);
    this.secondSelectedDate = new Date(date.getFullYear() + 1, 0, 0);
    this.datesApplied.next({ startDate: this.firstSelectedDate, stopDate: this.secondSelectedDate });
  }

  public lastYear(): void {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    this.firstSelectedDate = new Date(date.getFullYear(), 0, 1);
    this.secondSelectedDate = new Date(date.getFullYear() + 1, 0, 0);
    this.datesApplied.next({ startDate: this.firstSelectedDate, stopDate: this.secondSelectedDate });
  }

  public firstMonthPrevious(): void {
    this.firstMonth.setMonth(this.firstMonth.getMonth() - 1);
    this.firstMonth = new Date(this.firstMonth);
    this.setWeeks();
  }

  public firstMonthNext(): void {
    this.firstMonth.setMonth(this.firstMonth.getMonth() + 1);
    this.firstMonth = new Date(this.firstMonth);

    if (this.firstMonth.getMonth() === this.secondMonth.getMonth()) {
      this.secondMonth.setMonth(this.secondMonth.getMonth() + 1);
      this.secondMonth = new Date(this.secondMonth);
    }

    this.setWeeks();
  }

  public secondMonthPrevious(): void {
    this.secondMonth.setMonth(this.secondMonth.getMonth() - 1);
    this.secondMonth = new Date(this.secondMonth);

    if (this.firstMonth.getMonth() === this.secondMonth.getMonth()) {
      this.firstMonth.setMonth(this.firstMonth.getMonth() - 1);
      this.firstMonth = new Date(this.firstMonth);
    }

    this.setWeeks();
  }

  public secondMonthNext(): void {
    this.secondMonth.setMonth(this.secondMonth.getMonth() + 1);
    this.secondMonth = new Date(this.secondMonth);
    this.setWeeks();
  }

  public applyDates(): void {
    this.datesApplied.next({ startDate: this.firstSelectedDate, stopDate: this.secondSelectedDate });
  }

  public startDateFocusOut(): void {
    const startDateControlValue = this.dateRange.controls['startDate'].value;

    if (this.isDate(startDateControlValue)) {
      if (this.secondSelectedDate && startDateControlValue > this.secondSelectedDate) {
        this.firstSelectedDate = this.secondSelectedDate;
        this.secondSelectedDate = startDateControlValue;
      } else {
        this.firstSelectedDate = startDateControlValue;
      }
    } else {
      this.firstSelectedDate = this.privateFirstSelectedDate;
    }
  }

  public endDateFocusOut(): void {
    const endDateControlValue = this.dateRange.controls['endDate'].value;

    if (this.isDate(endDateControlValue)) {
      if (this.firstSelectedDate && endDateControlValue < this.firstSelectedDate) {
        this.secondSelectedDate = this.firstSelectedDate;
        this.firstSelectedDate = endDateControlValue;
      } else {
        this.secondSelectedDate = endDateControlValue;
      }
    } else {
      this.secondSelectedDate = this.privateFirstSelectedDate;
    }
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

  private isDate(date: any): boolean {
    return date instanceof Date && !Number.isNaN(date.getTime());
  }
}
