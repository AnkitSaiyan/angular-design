import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgDfmCardModule } from '../card/card.module';
import { NotificationComponent } from './components/notification/notification.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  imports: [CommonModule, NgDfmCardModule, IconModule],
})
export class NotificationModule {}
