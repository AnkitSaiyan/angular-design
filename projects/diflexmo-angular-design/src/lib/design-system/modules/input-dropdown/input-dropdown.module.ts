import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularResizeEventModule } from 'angular-resize-event';
import { NgDfmIconModule } from '../icon/icon.module';
import { NgDfmInputModule } from '../input/input.module';
import { NgDfmTagModule } from '../tag/tag.module';
import { InputDropdownComponent } from './input-dropdown.component';
import { NgDfmErrorModule } from '../error/error.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [InputDropdownComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgDfmIconModule,
    NgDfmInputModule,
    NgDfmTagModule,
    NgDfmErrorModule,
    DirectivesModule,
    AngularResizeEventModule,
  ],
  exports: [InputDropdownComponent],
})
export class NgDfmInputDropdownModule {}
