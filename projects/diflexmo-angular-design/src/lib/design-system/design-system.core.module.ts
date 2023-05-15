import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeNlBe from '@angular/common/locales/nl-BE';
import localeNl from '@angular/common/locales/nl';
import { DfmPipesModule } from './pipes/pipes.module';
import { IconCoreModule } from './modules/icon/icon.core.module';

registerLocaleData(localeNl);
registerLocaleData(localeNlBe);

@NgModule({
  imports: [IconCoreModule, DfmPipesModule],
  exports: [DfmPipesModule],
})
export class DesignSystemCoreModule {}
