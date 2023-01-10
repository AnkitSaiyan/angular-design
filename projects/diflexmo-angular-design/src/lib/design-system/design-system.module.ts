import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from './modules/notification/notification.module';
import { IconModule } from './modules/icon/icon.module';
import { BaseCheckboxModule } from './modules/base-checkbox/base-checkbox.module';
import { ButtonModule } from './modules/button/button.module';
import { InputModule } from './modules/input/input.module';
import { ErrorModule } from './modules/error/error.module';
import { BadgeModule } from './modules/badge/badge.module';
import { TagModule } from './modules/tag/tag.module';
import { TextAreaModule } from './modules/text-area/text-area.module';
import { DatepickerModule } from './modules/datepicker/datepicker.module';
import { TableModule } from './modules/table/table.module';
import { InputDropdownModule } from './modules/input-dropdown/input-dropdown.module';
import { CardModule } from './modules/card/card.module';
import { NavigationBarModule } from './modules/navigation-bar/navigation-bar.module';
import { DirectivesModule } from './directives/directives.module';
import { ClipboardModule } from './modules/clipboard/clipboard.module';
import { DfmDataTableModule } from './modules/data-table/data-table.module';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    BadgeModule,
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
    ClipboardModule,
    DfmDataTableModule
  ],
  exports: [
    ButtonModule,
    IconModule,
    BadgeModule,
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
    ClipboardModule,
    DfmDataTableModule
  ],
})
export class DesignSystemModule {}
