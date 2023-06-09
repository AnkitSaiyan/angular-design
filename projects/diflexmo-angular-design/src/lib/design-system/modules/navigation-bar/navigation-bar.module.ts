import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';
import { DfmIconModule } from '../icon/icon.module';
import { NavigationItemTenantComponent } from './components/navigation-item-tenant/navigation-item-tenant.component';
import { NavigationItemEventComponent } from './components/navigation-item-event/navigation-item-event.component';
import { DfmBadgeModule } from '../badge/badge.module';
import { DfmButtonModule } from '../button/button.module';
import { NavigationItemEventsComponent } from './components/navigation-item-events/navigation-item-events.component';
import { NavigationItemProfileComponent } from './components/navigation-item-profile/navigation-item-profile.component';
import { DfmPipesModule } from '../../pipes/pipes.module';
import { DfmDirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    NavigationBarComponent,
    NavigationItemComponent,
    NavigationItemTenantComponent,
    NavigationItemEventComponent,
    NavigationItemEventsComponent,
    NavigationItemProfileComponent,
  ],
  imports: [CommonModule, DfmIconModule, RouterModule, DfmBadgeModule, DfmButtonModule, DfmPipesModule, DfmDirectivesModule],
  exports: [NavigationBarComponent, NavigationItemComponent, NavigationItemTenantComponent],
})
export class DfmNavigationBarModule {}
