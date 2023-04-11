import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { BaseCheckboxComponent } from './components/base-checkbox.component';

@NgModule({
  declarations: [BaseCheckboxComponent, RadioButtonComponent, CheckboxComponent, ToggleComponent],
  imports: [CommonModule, FormsModule],
  exports: [RadioButtonComponent, CheckboxComponent, ToggleComponent],
})
export class NgDfmCheckboxModule {}
