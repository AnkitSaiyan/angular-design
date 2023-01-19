import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectItem } from '../../../input-dropdown/models/select-item';

@Component({
  selector: 'dfm-navigation-item-profile',
  templateUrl: './navigation-item-profile.component.html',
  styleUrls: ['./navigation-item-profile.component.scss', '../navigation-item/navigation-item.component.scss'],
})
export class NavigationItemProfileComponent {
  @Input() public title: string = '';

  @Input() public tenants: SelectItem[] = [];

  @Input() public currentTenantValue: string = '';

  @Output() public tenantChanged = new EventEmitter<string>();
}
