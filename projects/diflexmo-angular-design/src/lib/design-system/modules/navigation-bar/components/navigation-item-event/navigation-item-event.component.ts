import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BadgeColor } from '../../../badge/types/badge-color.type';
import { NavigationItemEvent } from '../../models/navigation-item-event';
import { NavigationItemEventType } from '../../types/navigation-item-event.type';

@Component({
  selector: 'dfm-navigation-item-event',
  templateUrl: './navigation-item-event.component.html',
  styleUrls: ['./navigation-item-event.component.scss'],
})
export class NavigationItemEventComponent implements OnInit, AfterViewInit {
  @Input() event!: NavigationItemEvent;

  @Output() eventDismissed = new EventEmitter<string>();

  @ViewChild('details', { static: true }) details?: ElementRef;

  public badgeColor?: BadgeColor;

  public badgeText?: string;

  public isDetailsTextExpandable: boolean = false;

  public isExpanded: boolean = false;

  constructor(private changeDetection: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.event) {
      return;
    }

    if (this.event.type !== undefined) {
      this.badgeColor = this.getBadgeColor(this.event.type);
      this.badgeText = this.getBadgeText(this.event.type);
    }
  }

  ngAfterViewInit(): void {
    if (this.details && this.details.nativeElement.offsetWidth < this.details.nativeElement.scrollWidth) {
      this.isDetailsTextExpandable = true;
      this.changeDetection.detectChanges();
    }
  }

  navigate() {
    if (this.event.link) {
      window.open(this.event.link, '_blank');
    }
  }

  private getBadgeColor(type: NavigationItemEventType): BadgeColor {
    switch (type) {
      case NavigationItemEventType.SUCCESS:
        return 'success';
      case NavigationItemEventType.WARNING:
        return 'warning';
      case NavigationItemEventType.ERROR:
        return 'primary';
       case NavigationItemEventType.NEW:
        return 'primary';
      default:
        return 'gray';
    }
  }

  private getBadgeText(type: NavigationItemEventType): string {
    switch (type) {
      case NavigationItemEventType.SUCCESS:
        return 'Success';
      case NavigationItemEventType.WARNING:
        return 'Warning';
      case NavigationItemEventType.ERROR:
        return 'Error';
      case NavigationItemEventType.NEW:
        return 'New';
      default:
        return 'Info';
    }
  }
}
