import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { NgDfmIconModule } from '../icon/icon.module';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';
import { ButtonGroupItemComponent } from './components/button-group-item/button-group-item.component';

@NgModule({
  declarations: [ButtonComponent, ButtonGroupComponent, ButtonIconComponent, ButtonGroupItemComponent],
  imports: [CommonModule, NgDfmIconModule],
  exports: [ButtonComponent, ButtonGroupComponent, ButtonGroupItemComponent, ButtonIconComponent],
})
export class NgDfmButtonModule {}
