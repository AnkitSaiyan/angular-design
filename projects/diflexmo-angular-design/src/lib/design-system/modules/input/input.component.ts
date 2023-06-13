import { Component, Inject, Input, LOCALE_ID, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { InputType } from './types/input-type.type';
import { InputSize } from '../../types/input-size.type';

@Component({
  selector: 'dfm-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: InputType = 'text';

  @Input() size: InputSize = 'sm';

  @Input() label: string = '';

  @Input() placeholder: string = '';

  @Input() disabled: boolean = false;

  @Input() hint: string = '';

  @Input() icon: string = '';

  @Input() isInvalid: boolean = false;

  @Input() readonly: boolean = false;

  showHint: boolean = false;

  onChange: any = () => {};

  onTouched: any = () => {};

  value: any = '';

  constructor(@Optional() public control: NgControl, @Inject(LOCALE_ID) private locale: string) {
    if (this.control != null) {
      this.control.valueAccessor = this;
    }
  }

  writeValue(obj: any): void {
    this.value = this.isDate(obj) ? formatDate(obj, 'shortDate', this.locale) : obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  clickHintIcon(): void {
    this.showHint = !this.showHint;
  }

  onValueChanged(value: any): void {
    const changedValue = this.type === 'datepicker' ? new Date(value) : value;
    this.onChange(changedValue);
  }

  private isDate(date: any) {
    return this.type === 'datepicker' && date && date instanceof Date && !Number.isNaN(date.getTime());
  }
}
