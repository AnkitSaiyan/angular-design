import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from '../../../input-dropdown/models/select-item';

@Component({
  selector: 'dfm-navigation-item-tenant',
  templateUrl: './navigation-item-tenant.component.html',
  styleUrls: ['./navigation-item-tenant.component.scss', '../navigation-item/navigation-item.component.scss'],
})
export class NavigationItemTenantComponent implements OnInit {
  @Input() public tenants: SelectItem[] = [];

  @Input() public currentTenantValue: string = '';

  @Output() public tenantChanged = new EventEmitter<string>();

  public currentTenant: SelectItem | null = null;

  ngOnInit(): void {
    if (this.currentTenantValue) {
      this.currentTenant = this.tenants.find((t) => t.value === this.currentTenantValue) || null;
    }
  }

  public select(tenant: SelectItem): void {
    if (this.currentTenantValue === tenant.value) {
      return;
    }

    this.currentTenantValue = tenant.value;
    this.currentTenant = tenant;
    this.tenantChanged.emit(this.currentTenantValue);
  }
}
