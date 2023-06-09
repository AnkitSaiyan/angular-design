import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DfmCardModule } from '../card/card.module';
import { NotificationComponent } from './components/notification/notification.component';
import { DfmIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  imports: [CommonModule, DfmCardModule, DfmIconModule],
})
export class DfmNotificationModule {}
