import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DiflexmoNotification } from '../models/diflexmo-notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new Subject<DiflexmoNotification>();

  public notifications$: Observable<DiflexmoNotification> = this.notificationsSubject.asObservable();

  public addNotification(notification: DiflexmoNotification): void {
    this.notificationsSubject.next(notification);
  }
}
