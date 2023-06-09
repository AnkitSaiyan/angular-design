import { EnvironmentProviders, NgModule, makeEnvironmentProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DfmNotificationModule } from './modules/notification/notification.module';
import { DfmIconModule, provideIcons } from './modules/icon/icon.module';
import { DfmCheckboxModule } from './modules/base-checkbox/base-checkbox.module';
import { DfmButtonModule } from './modules/button/button.module';
import { DfmInputModule } from './modules/input/input.module';
import { DfmErrorModule } from './modules/error/error.module';
import { DfmTagModule } from './modules/tag/tag.module';
import { DfmTextAreaModule } from './modules/text-area/text-area.module';
import { DfmInputDropdownModule } from './modules/input-dropdown/input-dropdown.module';
import { DfmCardModule } from './modules/card/card.module';
import { DfmNavigationBarModule } from './modules/navigation-bar/navigation-bar.module';
import { DfmDirectivesModule } from './directives/directives.module';
import { DfmClipboardModule } from './modules/clipboard/clipboard.module';
import { DfmDataTableModule } from './modules/data-table/data-table.module';
import { DfmDropdownModule } from './modules/dropdown/dropdown.module';
import { DfmDatePickerModule } from './modules/date-range-picker/date-picker.module';
import { DfmBadgeModule } from './modules/badge/badge.module';
import { DfmPipesModule } from './pipes/pipes.module';
import { DesignSystemConfig } from './configs/design-system-config';

export function provideDesignSystem(config?: DesignSystemConfig): EnvironmentProviders {
  return makeEnvironmentProviders([provideIcons(config?.iconConfig)]);
}

@NgModule({
  imports: [
    CommonModule,
    DfmButtonModule,
    DfmIconModule,
    DfmBadgeModule,
    DfmInputModule,
    DfmErrorModule,
    DfmTagModule,
    DfmCheckboxModule,
    DfmTextAreaModule,
    DfmInputDropdownModule,
    DfmCardModule,
    DfmNavigationBarModule,
    DfmNotificationModule,
    DfmDirectivesModule,
    DfmClipboardModule,
    DfmDataTableModule,
    DfmDatePickerModule,
    DfmPipesModule,
  ],
  exports: [
    DfmButtonModule,
    DfmIconModule,
    DfmBadgeModule,
    DfmInputModule,
    DfmErrorModule,
    DfmTagModule,
    DfmCheckboxModule,
    DfmTextAreaModule,
    DfmInputDropdownModule,
    DfmCardModule,
    DfmNavigationBarModule,
    DfmNotificationModule,
    DfmDirectivesModule,
    DfmClipboardModule,
    DfmDataTableModule,
    DfmDropdownModule,
    DfmDatePickerModule,
    DfmPipesModule,
  ],
})
export class DfmDesignSystemModule {}
