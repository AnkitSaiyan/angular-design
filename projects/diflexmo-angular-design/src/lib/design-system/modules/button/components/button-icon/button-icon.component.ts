import { Component, Input } from '@angular/core';
import { ButtonIconColor } from '../../types/button-icon-color.type';
import { ButtonSize } from '../../types/button-size.type';

@Component({
  selector: 'dfm-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss'],
})
export class ButtonIconComponent {
  @Input() color: ButtonIconColor = 'primary';

  @Input() size: ButtonSize = 'lg';

  @Input() disabled: boolean = false;

  @Input() icon: string = '';
}
