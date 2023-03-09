import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonColor } from '../../types/button-color.type';
import { ButtonSize } from '../../types/button-size.type';

@Component({
  selector: 'dfm-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() color: ButtonColor = 'primary';

  @Input() size: ButtonSize = 'lg';

  @Input() disabled: boolean = false;

  @Input() leadingIcon: string = '';

  @Input() trailingIcon: string = '';

  @Output() clicked = new EventEmitter();

  click() {
    this.clicked.emit();
  }
}

// @Component({
//   selector: 'button[dfm-button]',
//   styleUrls: ['./dfm-button.scss'],
//   template: '<ng-content></ng-content>',
//   inputs: ['disabled'],
//   host: {
//     '[attr.disabled]': 'disabled',
//     '[class.dfm-py-8]': 'size === sm',
//     '[class.dfm-py-10]': 'size === md || size === lg',
//     '[class.dfm-py-12]': 'size === xl',
//     '[class.dfm-py-16]': 'size === 2xl',
//     '[class.dfm-px-14]': 'size === sm',
//     '[class.dfm-px-16]': 'size === md',
//     '[class.dfm-px-18]': 'size === lg',
//     '[class.dfm-px-20]': 'size === xl',
//     '[class.dfm-px-28]': 'size === 2xl'
//   }
// })
// export class NgDfmButtonComponent {
//   @Input() color: ButtonColor = 'primary';

//   @Input() size: ButtonSize = 'lg';
// }
