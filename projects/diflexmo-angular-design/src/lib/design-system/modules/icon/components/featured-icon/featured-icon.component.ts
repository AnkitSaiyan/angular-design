import { Component, Input } from '@angular/core';
import { FeaturedIconColor } from '../../types/featured-icon-color.type';
import { FeaturedIconSize } from '../../types/featured-icon-size.type';
import { FeaturedIconTheme } from '../../types/featured-icon-theme.type';

@Component({
  selector: 'dfm-featured-icon',
  templateUrl: './featured-icon.component.html',
  styleUrls: ['./featured-icon.component.scss'],
})
export class FeaturedIconComponent {
  @Input() name: string = '';

  @Input() size: FeaturedIconSize = 'md';

  @Input() color: FeaturedIconColor = 'primary';

  @Input() theme: FeaturedIconTheme = 'light-circle';
}
