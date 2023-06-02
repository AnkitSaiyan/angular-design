import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularResizeEventModule } from 'angular-resize-event';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';
import { NgDfmIconModule } from '../icon/icon.module';
import { NavigationItemTenantComponent } from './components/navigation-item-tenant/navigation-item-tenant.component';
import { NavigationItemEventComponent } from './components/navigation-item-event/navigation-item-event.component';
import { NgDfmBadgeModule } from '../badge/badge.module';
import { NgDfmButtonModule } from '../button/button.module';
import { NavigationItemEventsComponent } from './components/navigation-item-events/navigation-item-events.component';
import { NavigationItemProfileComponent } from './components/navigation-item-profile/navigation-item-profile.component';
import { DfmPipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    NavigationBarComponent,
    NavigationItemComponent,
    NavigationItemTenantComponent,
    NavigationItemEventComponent,
    NavigationItemEventsComponent,
    NavigationItemProfileComponent,
  ],
  imports: [CommonModule, NgDfmIconModule, RouterModule, NgDfmBadgeModule, NgDfmButtonModule, AngularResizeEventModule, DfmPipesModule],
  exports: [NavigationBarComponent, NavigationItemComponent, NavigationItemTenantComponent],
})
export class NgDfmNavigationBarModule {}
