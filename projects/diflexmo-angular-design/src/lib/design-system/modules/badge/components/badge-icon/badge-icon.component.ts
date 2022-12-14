import { Component, Input } from '@angular/core';
import { BadgeColor } from '../../types/badge-color.type';
import { BadgeSize } from '../../types/badge-size.type';

@Component({
  selector: 'dfm-badge-icon',
  template: `
    <div class="dfm-badge-{{ size }}-icon dfm-badge-{{ color }}">
      <dfm-icon class="icon-12" [name]="icon"></dfm-icon>
    </div>
  `,
  styleUrls: ['../badge/badge.component.scss'],
})
export class BadgeIconComponent {
  @Input() size: BadgeSize = 'sm';

  @Input() icon: string = 'placeholder';

  @Input() color: BadgeColor = 'primary';
}
