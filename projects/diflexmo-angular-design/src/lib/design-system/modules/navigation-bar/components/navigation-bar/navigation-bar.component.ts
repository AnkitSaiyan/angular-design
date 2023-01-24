import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SelectItem } from '../../../input-dropdown/models/select-item';
import { NavigationItem } from '../../models/navigation-item';

@Component({
  selector: 'dfm-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit, AfterViewInit, OnDestroy {
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

  private subscriptions = new Subscription();

  constructor(private router: Router) {}

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

    const subscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.isMoreItemsSectionShown = false;
      }
    });

    this.subscriptions.add(subscription);
  }

  ngAfterViewInit(): void {
    if (this.content) {
      this.content.nativeElement.onscroll = (e: Event) => (this.isCollapsed = (e.target as HTMLElement).scrollTop > 64);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
