import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularResizeEventModule } from 'angular-resize-event';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';
import { IconModule } from '../icon/icon.module';
import { NavigationItemTenantComponent } from './components/navigation-item-tenant/navigation-item-tenant.component';
import { NavigationItemEventComponent } from './components/navigation-item-event/navigation-item-event.component';
import { NgDfmBadgeModule } from '../badge/badge.module';
import { NgDfmButtonModule } from '../button/button.module';
import { NavigationItemEventsComponent } from './components/navigation-item-events/navigation-item-events.component';
import { NavigationItemProfileComponent } from './components/navigation-item-profile/navigation-item-profile.component';

@NgModule({
  declarations: [
    NavigationBarComponent,
    NavigationItemComponent,
    NavigationItemTenantComponent,
    NavigationItemEventComponent,
    NavigationItemEventsComponent,
    NavigationItemProfileComponent,
  ],
  imports: [CommonModule, IconModule, RouterModule, NgDfmBadgeModule, NgDfmButtonModule, AngularResizeEventModule],
  exports: [NavigationBarComponent, NavigationItemComponent, NavigationItemTenantComponent],
})
export class NavigationBarModule {}
