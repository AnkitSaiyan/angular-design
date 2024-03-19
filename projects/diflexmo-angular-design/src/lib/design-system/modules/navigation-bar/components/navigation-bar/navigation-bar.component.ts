import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SelectItem } from '../../../input-dropdown/models/select-item';
import { NavigationItem } from '../../models/navigation-item';
import { NavigationItemEvent } from '../../models/navigation-item-event';
import { NavigationProfileData } from '../../models/navigation-profile-data';

@Component({
  selector: 'dfm-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() navigationItems: NavigationItem[] = [];

  @Input() isTenantDropdownShown: boolean = false;

  @Input() tenants: SelectItem[] = [];

  @Input() currentTenant?: string;

  @Input() isProfileShown: boolean = true;

  @Input() isNotificationsCounterShown: boolean = false;

  @Input() isMessagesCounterShown: boolean = false;

  @Input() notifications: NavigationItemEvent[] = [];

  @Input() messages: NavigationItemEvent[] = [];

  @Input() logoPath?: string;

  @Input() miniLogoPath?: string;

  @Input() profileData?: NavigationProfileData;

  @Input() additionalNavigationItems?: TemplateRef<any>;

  @Input() isSettingsButtonShown: boolean = true;

  @Input() isThemeOptionsShown: boolean = true;

  @Output() tenantChanged = new EventEmitter<string>();

  @Output() notificationsDismissed = new EventEmitter<string[]>();

  @Output() messagesDismissed = new EventEmitter<string[]>();

  @Output() logout = new EventEmitter();

  @ViewChild('content') content?: ElementRef;

  public isCollapsed: boolean = false;

  public isMoreItemsSectionShown: boolean = false;

  public isMoreItemSelected: boolean = false;

  public mobileNavigationItemsToShow: NavigationItem[] = [];

  public mobileNavigationItemsToHide: NavigationItem[] = [];

  public gridTemplateColumnsStyle: string = '';

  private subscriptions = new Subscription();

  constructor(private router: Router) {}

  ngOnInit(): void {
    const subscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.isMoreItemsSectionShown = false;
      }
    });

    this.subscriptions.add(subscription);

    this.recalculateNavigationItemsDisplaying();
  }

  ngAfterViewInit(): void {
    if (this.content) {
      this.content.nativeElement.onscroll = (e: Event) => (this.isCollapsed = (e.target as HTMLElement).scrollTop > (this.isCollapsed ? 46 : 64));
      this.content.nativeElement.addEventListener('click', this.hideMoreItemsSection.bind(this));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['navigationItems']?.currentValue) {
      this.recalculateNavigationItemsDisplaying();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.content?.nativeElement.removeEventListener('click', this.hideMoreItemsSection);
  }

  recalculateNavigationItemsDisplaying() {
    if (window.innerWidth <= 980 && window.innerWidth > 680) {
      this.updateNavigationItems(4);
    } else if (window.innerWidth <= 680 && window.innerWidth > 490) {
      this.updateNavigationItems(3);
    } else if (window.innerWidth <= 490) {
      this.updateNavigationItems(2);
    }
  }

  private hideMoreItemsSection() {
    this.isMoreItemsSectionShown = false;
  }

  private updateNavigationItems(countToShow: number) {
    const count = countToShow > this.navigationItems.length ? this.navigationItems.length : countToShow;
    this.mobileNavigationItemsToShow = this.navigationItems.slice(0, count);
    this.mobileNavigationItemsToHide = this.navigationItems.slice(count);

    this.gridTemplateColumnsStyle = `repeat(${this.mobileNavigationItemsToHide.length ? count + 1 : count}, 1fr)`;
  }
}
