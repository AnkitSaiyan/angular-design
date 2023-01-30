import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { SelectItem } from '../../../input-dropdown/models/select-item';

@Component({
  selector: 'dfm-navigation-item-tenant',
  templateUrl: './navigation-item-tenant.component.html',
  styleUrls: ['./navigation-item-tenant.component.scss', '../navigation-item/navigation-item.component.scss'],
})
export class NavigationItemTenantComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public tenants: SelectItem[] = [];

  @Input() public currentTenantValue: string = '';

  @Output() public tenantChanged = new EventEmitter<string>();

  @ViewChild('dropdown') dropdown?: ElementRef;

  public currentTenant?: SelectItem;

  public isDropdownOpened: boolean = false;

  ngOnInit(): void {
    if (this.currentTenantValue) {
      this.currentTenant = this.tenants.find((t) => t.value === this.currentTenantValue);
    }
  }

  ngAfterViewInit(): void {
    this.dropdown?.nativeElement.addEventListener('shown.bs.dropdown', this.markDropdownAsOpened);
    this.dropdown?.nativeElement.addEventListener('hidden.bs.dropdown', this.markDropdownAsClosed);
  }

  ngOnDestroy(): void {
    this.dropdown?.nativeElement.removeEventListener('shown.bs.dropdown', this.markDropdownAsOpened);
    this.dropdown?.nativeElement.removeEventListener('hidden.bs.dropdown', this.markDropdownAsClosed);
  }

  public select(tenant: SelectItem): void {
    if (this.currentTenantValue === tenant.value) {
      return;
    }

    this.currentTenantValue = tenant.value;
    this.currentTenant = tenant;
    this.tenantChanged.emit(this.currentTenantValue);
  }

  private markDropdownAsOpened() {
    this.isDropdownOpened = true;
  }

  private markDropdownAsClosed() {
    this.isDropdownOpened = false;
  }
}
