import { NavigationItemEventType } from '../types/navigation-item-event.type';

export class NavigationItemEvent {
  constructor(
    public id: string,
    public date: Date,
    public message: string,
    public type?: NavigationItemEventType,
    public details?: string,
    public link?: string,
  ) {}
}
