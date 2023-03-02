import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from './modules/notification/notification.module';
import { IconModule } from './modules/icon/icon.module';
import { BaseCheckboxModule } from './modules/base-checkbox/base-checkbox.module';
import { ButtonModule } from './modules/button/button.module';
import { InputModule } from './modules/input/input.module';
import { ErrorModule } from './modules/error/error.module';
import { TagModule } from './modules/tag/tag.module';
import { TextAreaModule } from './modules/text-area/text-area.module';
import { DatepickerModule } from './modules/datepicker/datepicker.module';
import { TableModule } from './modules/table/table.module';
import { InputDropdownModule } from './modules/input-dropdown/input-dropdown.module';
import { CardModule } from './modules/card/card.module';
import { NavigationBarModule } from './modules/navigation-bar/navigation-bar.module';
import { DirectivesModule } from './directives/directives.module';
import { NgDfmClipboardModule } from './modules/clipboard/clipboard.module';
import { DfmDataTableModule } from './modules/data-table/data-table.module';
import { NgDfmDropdownModule } from './modules/dropdown/dropdown.module';
import { NgDfmDatePickerModule } from './modules/date-range-picker/date-picker.module';
import { NgDfmBadgeModule } from './modules/badge/badge.module';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    NgDfmBadgeModule,
    InputModule,
    ErrorModule,
    TagModule,
    BaseCheckboxModule,
    TextAreaModule,
    InputDropdownModule,
    DatepickerModule,
    TableModule,
    CardModule,
    NavigationBarModule,
    NotificationModule,
    DirectivesModule,
    NgDfmClipboardModule,
    DfmDataTableModule,
    NgDfmDatePickerModule,
  ],
  exports: [
    ButtonModule,
    IconModule,
    NgDfmBadgeModule,
    InputModule,
    ErrorModule,
    TagModule,
    BaseCheckboxModule,
    TextAreaModule,
    InputDropdownModule,
    DatepickerModule,
    TableModule,
    CardModule,
    NavigationBarModule,
    NotificationModule,
    DirectivesModule,
    NgDfmClipboardModule,
    DfmDataTableModule,
    NgDfmDropdownModule,
    NgDfmDatePickerModule,
  ],
})
export class DesignSystemModule {}
