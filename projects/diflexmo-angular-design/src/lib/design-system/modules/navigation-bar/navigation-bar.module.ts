import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';
import { IconModule } from '../icon/icon.module';
import { NavigationItemTenantComponent } from './components/navigation-item-tenant/navigation-item-tenant.component';
import { NavigationItemEventComponent } from './components/navigation-item-event/navigation-item-event.component';
import { BadgeModule } from '../badge/badge.module';
import { ButtonModule } from '../button/button.module';
import { NavigationItemEventsComponent } from './components/navigation-item-events/navigation-item-events.component';

@NgModule({
  declarations: [
    NavigationBarComponent,
    NavigationItemComponent,
    NavigationItemTenantComponent,
    NavigationItemEventComponent,
    NavigationItemEventsComponent,
  ],
  imports: [CommonModule, IconModule, RouterModule, BadgeModule, ButtonModule],
  exports: [NavigationBarComponent, NavigationItemComponent, NavigationItemTenantComponent],
})
export class NavigationBarModule {}
