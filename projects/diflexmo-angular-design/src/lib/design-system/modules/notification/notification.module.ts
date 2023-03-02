import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgDfmCardModule } from '../card/card.module';
import { NotificationComponent } from './components/notification/notification.component';
import { NgDfmIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  imports: [CommonModule, NgDfmCardModule, NgDfmIconModule],
})
export class NotificationModule {}
