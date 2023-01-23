import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

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

  @Output() routerLinkActivated = new EventEmitter();

  @ViewChild('routerLinkActive') routerLinkActive?: RouterLinkActive;

  private subscriptions = new Subscription();

  ngAfterViewInit(): void {
    const subscription = this.routerLinkActive?.isActiveChange.subscribe((isActive) => {
      if (isActive) {
        this.routerLinkActivated.emit();
      }
    });

    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
