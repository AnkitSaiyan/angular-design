import { Component, Input } from '@angular/core';

@Component({
  selector: 'dfm-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
})
export class NavigationItemComponent {
  @Input() title: string = '';

  @Input() icon: string = '';

  @Input() routerLink: string | null = null;

  @Input() exact: boolean = false;
}
