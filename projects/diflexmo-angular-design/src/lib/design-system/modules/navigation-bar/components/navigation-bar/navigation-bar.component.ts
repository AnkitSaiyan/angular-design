import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SelectItem } from '../../../input-dropdown/models/select-item';
import { NavigationItem } from '../../models/navigation-item';

@Component({
  selector: 'dfm-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit, AfterViewInit {
  @Input() navigationItems: NavigationItem[] = [];

  @Input() isTenantDropdownShown: boolean = false;

  @Input() tenants: SelectItem[] = [];

  @Input() currentTenant?: string;

  @Input() isProfileShown: boolean = true;

  @Input() isNotificationsCounterShown: boolean = false;

  @Input() isMessagesCounterShown: boolean = false;

  @Output() tenantChanged = new EventEmitter<string>();

  @ViewChild('content') content!: ElementRef;

  public isCollapsed: boolean = false;

  public isMoreItemsSectionShown: boolean = false;

  public isMoreItemSelected: boolean = false;

  public mobileNavigationItemsToShow: NavigationItem[] = [];

  public mobileNavigationItemsToHide: NavigationItem[] = [];

  public gridTemplateColumnsStyle: string = '';

  ngOnInit(): void {
    this.navigationItems.forEach((navigationItem) =>
      navigationItem.isHiddenForMobile
        ? this.mobileNavigationItemsToHide.push(navigationItem)
        : this.mobileNavigationItemsToShow.push(navigationItem),
    );

    const gridColumnsCount = this.mobileNavigationItemsToHide.length
      ? this.mobileNavigationItemsToShow.length + 1
      : this.mobileNavigationItemsToHide.length;

    this.gridTemplateColumnsStyle = `repeat(${gridColumnsCount}, 1fr)`;
  }

  ngAfterViewInit(): void {
    if (this.content) {
      this.content.nativeElement.onscroll = (e: Event) => (this.isCollapsed = (e.target as HTMLElement).scrollTop > 64);
    }
  }
}
