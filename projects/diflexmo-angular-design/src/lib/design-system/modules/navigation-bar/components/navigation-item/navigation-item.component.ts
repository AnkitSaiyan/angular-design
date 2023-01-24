import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
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

  public selectedChildIndex?: number;

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
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
