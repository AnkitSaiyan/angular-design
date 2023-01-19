import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';
import { IconModule } from '../icon/icon.module';
import { NavigationItemTenantComponent } from './components/navigation-item-tenant/navigation-item-tenant.component';
import { NavigationItemProfileComponent } from './components/navigation-item-profile/navigation-item-profile.component';

@NgModule({
  declarations: [NavigationBarComponent, NavigationItemComponent, NavigationItemTenantComponent, NavigationItemProfileComponent],
  imports: [CommonModule, IconModule, RouterModule],
  exports: [NavigationBarComponent, NavigationItemComponent, NavigationItemTenantComponent, NavigationItemProfileComponent],
})
export class NavigationBarModule {}
