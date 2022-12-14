import { NotificationType } from './notification-type';

export class DiflexmoNotification {
  constructor(public type: NotificationType, public headerText: string, public bodyText: string = '', public sticky: boolean = false) {
    this.sticky = sticky;
    this.type = type;
    this.headerText = headerText;
    this.bodyText = bodyText;
  }
}
