import { ControlValueAccessor } from '@angular/forms';

export class BaseControlValueAccessor implements ControlValueAccessor {
  private privateValue: any = '';

  public set value(value: any) {
    this.privateValue = value;
    this.onTouch(value);
    this.onChange(value);
  }

  public get value(): any {
    return this.privateValue;
  }

  public disabled: boolean = false;

  public onChange: any = () => {};

  onTouch: any = () => {};

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
