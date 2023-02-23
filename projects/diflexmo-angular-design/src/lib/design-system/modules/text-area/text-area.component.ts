import { Component, Input, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'dfm-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements ControlValueAccessor {
  @Input() public label: string = '';

  @Input() public placeholder: string = '';

  @Input() public hint: string = '';

  @Input() public disabled: boolean = false;

  value: any = '';

  // eslint-disable-next-line class-methods-use-this
  onChange: any = () => {};

  // eslint-disable-next-line class-methods-use-this
  onTouched: any = () => {};

  constructor(@Optional() public control: NgControl) {
    if (this.control != null) {
      this.control.valueAccessor = this;
    }
  }

  writeValue(obj: any): void {
    console.log(obj)
    this.value = obj;
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

  onValueChanged(value: any): void {
    this.onChange(value);
  }
}
