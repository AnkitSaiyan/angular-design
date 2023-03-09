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
