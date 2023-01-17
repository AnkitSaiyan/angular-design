import { Component, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseCheckboxComponent } from '../base-checkbox.component';

@Component({
  selector: 'dfm-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent extends BaseCheckboxComponent {
  @Input() checkedValue: any = '';

  constructor(@Optional() public control: NgControl) {
    super();

    if (this.control != null) {
      this.control.valueAccessor = this;
    }
  }
}
