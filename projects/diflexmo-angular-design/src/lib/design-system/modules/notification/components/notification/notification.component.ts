import { Subject, takeUntil } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PositionType } from '../../models/position-type';
import { NotificationType } from '../../models/notification-type';
import { NotificationService } from '../../services/notification.service';
import { DiflexmoNotification } from '../../models/diflexmo-notification';

@Component({
  selector: 'dfm-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input()
  public position: PositionType = PositionType.BOTTOM_RIGHT;

  @Input()
  public iconName: string | undefined;

  public readonly timeToShowInSeconds: number = 4;

  public currentNotification?: DiflexmoNotification;

  public notificationType = NotificationType;

  public positionType = PositionType;

  private notifications: DiflexmoNotification[] = [];

  private takeUntil$: Subject<boolean> = new Subject<boolean>();

  constructor(private notificationService: NotificationService) {}

  public ngOnInit(): void {
    this.notificationService.notifications$.pipe(takeUntil(this.takeUntil$)).subscribe((notification) => {
      this.notifications.push(notification);
      this.showNextNotification();
    });
    this.hideAndShowNext(); // TODO remove
  }

  public hideAndShowNext(): void {
    this.currentNotification = undefined;
    this.showNextNotification();
  }

  private showNextNotification(): void {
    if (this.notifications.length > 0) {
      this.currentNotification = this.notifications.shift() as DiflexmoNotification;
      if (!this.currentNotification.sticky) {
        setTimeout(() => {
          this.hideAndShowNext();
        }, this.timeToShowInSeconds * 1000);
      }
    }
  }

  public ngOnDestroy(): void {
    this.takeUntil$.next(true);
  }
}
