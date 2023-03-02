import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from './modules/notification/notification.module';
import { NgDfmIconModule } from './modules/icon/icon.module';
import { NgDfmCheckboxModule } from './modules/base-checkbox/base-checkbox.module';
import { NgDfmButtonModule } from './modules/button/button.module';
import { NgDfmInputModule } from './modules/input/input.module';
import { NgDfmErrorModule } from './modules/error/error.module';
import { TagModule } from './modules/tag/tag.module';
import { TextAreaModule } from './modules/text-area/text-area.module';
import { DatepickerModule } from './modules/datepicker/datepicker.module';
import { TableModule } from './modules/table/table.module';
import { InputDropdownModule } from './modules/input-dropdown/input-dropdown.module';
import { NgDfmCardModule } from './modules/card/card.module';
import { NavigationBarModule } from './modules/navigation-bar/navigation-bar.module';
import { DirectivesModule } from './directives/directives.module';
import { NgDfmClipboardModule } from './modules/clipboard/clipboard.module';
import { NgDfmDataTableModule } from './modules/data-table/data-table.module';
import { NgDfmDropdownModule } from './modules/dropdown/dropdown.module';
import { NgDfmDatePickerModule } from './modules/date-range-picker/date-picker.module';
import { NgDfmBadgeModule } from './modules/badge/badge.module';

@NgModule({
  imports: [
    CommonModule,
    NgDfmButtonModule,
    NgDfmIconModule,
    NgDfmBadgeModule,
    NgDfmInputModule,
    NgDfmErrorModule,
    TagModule,
    NgDfmCheckboxModule,
    TextAreaModule,
    InputDropdownModule,
    DatepickerModule,
    TableModule,
    NgDfmCardModule,
    NavigationBarModule,
    NotificationModule,
    DirectivesModule,
    NgDfmClipboardModule,
    NgDfmDataTableModule,
    NgDfmDatePickerModule,
  ],
  exports: [
    NgDfmButtonModule,
    NgDfmIconModule,
    NgDfmBadgeModule,
    NgDfmInputModule,
    NgDfmErrorModule,
    TagModule,
    NgDfmCheckboxModule,
    TextAreaModule,
    InputDropdownModule,
    DatepickerModule,
    TableModule,
    NgDfmCardModule,
    NavigationBarModule,
    NotificationModule,
    DirectivesModule,
    NgDfmClipboardModule,
    NgDfmDataTableModule,
    NgDfmDropdownModule,
    NgDfmDatePickerModule,
  ],
})
export class DesignSystemModule {}
