import { Component, Input } from '@angular/core';
import { InputSize } from '../../../types/input-size.type';
import { BaseControlValueAccessor } from '../../base-control-value-accessor';

@Component({
  selector: 'dfm-base-checkbox',
  template: '',
  styleUrls: [],
})
export class BaseCheckboxComponent extends BaseControlValueAccessor {
  @Input() label: string = '';

  @Input() hint: string = '';

  @Input() size: InputSize = 'md';

  public id: string;

  constructor() {
    super();
    this.id = Math.random().toString(36).slice(2, 7);
    this.value = false;
  }
}
