import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '../card/card.module';
import { NotificationComponent } from './components/notification/notification.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  imports: [CommonModule, CardModule, IconModule],
})
export class NotificationModule {}
