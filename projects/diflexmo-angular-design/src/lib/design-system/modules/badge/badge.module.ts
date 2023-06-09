import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DfmIconModule } from '../icon/icon.module';
import { BadgeComponent } from './components/badge/badge.component';
import { BadgeIconComponent } from './components/badge-icon/badge-icon.component';

@NgModule({
  declarations: [BadgeIconComponent, BadgeComponent],
  imports: [CommonModule, DfmIconModule],
  exports: [BadgeIconComponent, BadgeComponent],
})
export class DfmBadgeModule {}
