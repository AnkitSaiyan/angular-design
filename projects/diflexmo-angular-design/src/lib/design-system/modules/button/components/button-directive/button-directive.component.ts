import { Component, HostBinding, Input } from '@angular/core';
import { ButtonColor } from '../../types/button-color.type';
import { ButtonSize } from '../../types/button-size.type';

@Component({
  selector: 'button[dfm-button]',
  templateUrl: './button-directive.component.html',
  styleUrls: ['../button/button.component.scss'],
})
export class ButtonDirectiveComponent {
  private privateColor: ButtonColor = 'primary';

  public get color(): ButtonColor {
    return this.privateColor;
  }

  @Input() public set color(value: ButtonColor) {
    this.privateColor = value;

    this.classes = `dfm-btn-${this.color}-${this.size}`;
  }

  private privateSize: ButtonSize = 'lg';

  public get size(): ButtonSize {
    return this.privateSize;
  }

  @Input() public set size(value: ButtonSize) {
    this.privateSize = value;

    this.classes = `dfm-btn-${this.color}-${this.size}`;
  }

  @Input() set disabled(value: any) {
    if (!value) {
      this.isDisabled = null;
    } else {
      this.isDisabled = value;
    }
    this.isDisabled = !value ? null : value;
  }

  @HostBinding('attr.disabled') isDisabled = null;

  @HostBinding('class') classes = 'dfm-btn-primary-lg';

  @Input() leadingIcon: string = '';

  @Input() trailingIcon: string = '';
}
