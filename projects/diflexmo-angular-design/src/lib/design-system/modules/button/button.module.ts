import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { DfmIconModule } from '../icon/icon.module';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';
import { ButtonGroupItemComponent } from './components/button-group-item/button-group-item.component';
import { ButtonDirectiveComponent } from './components/button-directive/button-directive.component';

@NgModule({
  declarations: [ButtonComponent, ButtonGroupComponent, ButtonIconComponent, ButtonGroupItemComponent, ButtonDirectiveComponent],
  imports: [CommonModule, DfmIconModule],
  exports: [ButtonComponent, ButtonGroupComponent, ButtonGroupItemComponent, ButtonIconComponent, ButtonDirectiveComponent],
})
export class DfmButtonModule {}
