import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseCheckboxComponent } from '../base-checkbox.component';

@Component({
  selector: 'dfm-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RadioButtonComponent),
    },
  ],
})
export class RadioButtonComponent extends BaseCheckboxComponent {
  @Input() checkedValue: any = '';
}
