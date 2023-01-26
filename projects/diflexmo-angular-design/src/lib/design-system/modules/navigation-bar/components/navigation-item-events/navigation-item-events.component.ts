import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NavigationItemEvent } from '../../models/navigation-item-event';

@Component({
  selector: 'dfm-navigation-item-events',
  templateUrl: './navigation-item-events.component.html',
  styleUrls: ['./navigation-item-events.component.scss'],
})
export class NavigationItemEventsComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() icon: string = '';

  @Input() events: NavigationItemEvent[] = [];

  @Output() eventsDismissed = new EventEmitter<string[]>();

  @ViewChild('dropdown', { read: ElementRef }) dropdown?: ElementRef;

  public shouldBeRendered: boolean = false;

  public eventsToShow: NavigationItemEvent[] = [];

  public maxEventsCountToShowInBadge: number = 99;

  private maxEventsCount: number = 3;

  private areAllEventsShown: boolean = true;

  ngAfterViewInit(): void {
    this.dropdown?.nativeElement.addEventListener('shown.bs.dropdown', () => {
      this.shouldBeRendered = true;
      this.areAllEventsShown = this.events.length <= this.maxEventsCount;
      this.eventsToShow = this.getEvents();
    });

    this.dropdown?.nativeElement.addEventListener('hidden.bs.dropdown', () => (this.shouldBeRendered = false));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events'] && changes['events'].currentValue) {
      this.eventsToShow = this.getEvents();
    }
  }

  ngOnDestroy(): void {
    this.dropdown?.nativeElement.removeEventListener('shown.bs.dropdown');
    this.dropdown?.nativeElement.removeEventListener('hidden.bs.dropdown');
  }

  dismissAll() {
    const eventIds = this.events.map((e) => e.id);
    this.eventsDismissed.emit(eventIds);
  }

  showAll() {
    this.eventsToShow = [...this.events];
    this.areAllEventsShown = true;
  }

  private getEvents() {
    return this.areAllEventsShown ? [...this.events] : this.events.slice(0, this.maxEventsCount);
  }
}
