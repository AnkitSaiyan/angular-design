import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationItem } from '../../models/navigation-item';

@Component({
  selector: 'dfm-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
})
export class NavigationItemComponent implements AfterViewInit, OnDestroy {
  @Input() title: string = '';

  @Input() icon: string = '';

  @Input() routerLink?: string;

  @Input() exact: boolean = false;

  @Input() selected: boolean = false;

  @Input() children: NavigationItem[] = [];

  @Output() routerLinkActivated = new EventEmitter();

  @ViewChild('routerLinkActive') routerLinkActive?: RouterLinkActive;

  @ViewChildren('childRouterLinkActive') childRouterLinksActive?: QueryList<RouterLinkActive>;

  @ViewChild('dropdown') dropdown?: ElementRef;

  public selectedChildIndex?: number;

  public isDropdownOpened: boolean = false;

  private subscriptions = new Subscription();

  ngAfterViewInit(): void {
    const subscription = this.routerLinkActive?.isActiveChange.subscribe((isActive) => {
      if (isActive) {
        this.routerLinkActivated.emit();
      }
    });

    if (this.children.length && this.childRouterLinksActive) {
      [...this.childRouterLinksActive].forEach((link, index) => {
        const childSubscription = link.isActiveChange.subscribe((isActive) => {
          if (isActive) {
            this.selectedChildIndex = index;
            this.routerLinkActivated.emit();
          } else if (this.selectedChildIndex === index) {
            this.selectedChildIndex = undefined;
          }

          this.subscriptions.add(childSubscription);
        });
      });
    }

    if (this.dropdown) {
      this.dropdown.nativeElement.addEventListener('shown.bs.dropdown', this.markDropdownAsOpened.bind(this));
      this.dropdown.nativeElement.addEventListener('hidden.bs.dropdown', this.markDropdownAsClosed.bind(this));
    }
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.dropdown?.nativeElement.removeEventListener('shown.bs.dropdown', this.markDropdownAsOpened);
    this.dropdown?.nativeElement.removeEventListener('hidden.bs.dropdown', this.markDropdownAsClosed);
  }

  private markDropdownAsOpened() {
    this.isDropdownOpened = true;
  }

  private markDropdownAsClosed() {
    this.isDropdownOpened = false;
  }
}
