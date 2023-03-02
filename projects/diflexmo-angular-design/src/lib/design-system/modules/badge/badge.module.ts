import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDfmIconModule } from '../icon/icon.module';
import { BadgeComponent } from './components/badge/badge.component';
import { BadgeIconComponent } from './components/badge-icon/badge-icon.component';

@NgModule({
  declarations: [BadgeIconComponent, BadgeComponent],
  imports: [CommonModule, NgDfmIconModule],
  exports: [BadgeIconComponent, BadgeComponent],
})
export class NgDfmBadgeModule {}
