import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularResizeEventModule } from 'angular-resize-event';
import { IconModule } from '../icon/icon.module';
import { InputModule } from '../input/input.module';
import { TagModule } from '../tag/tag.module';
import { InputDropdownComponent } from './input-dropdown.component';
import { ErrorModule } from '../error/error.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [InputDropdownComponent],
  imports: [CommonModule, FormsModule, IconModule, InputModule, TagModule, ErrorModule, DirectivesModule, AngularResizeEventModule],
  exports: [InputDropdownComponent],
})
export class InputDropdownModule {}
