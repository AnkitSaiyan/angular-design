import { Component, Input } from '@angular/core';

@Component({
  selector: 'dfm-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() name: string = '';
}
