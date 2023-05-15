import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeNlBe from '@angular/common/locales/nl-BE';
import localeNl from '@angular/common/locales/nl';
import { PipesModule } from './pipes/pipes.module';
import { IconCoreModule } from './modules/icon/icon.core.module';

registerLocaleData(localeNl);
registerLocaleData(localeNlBe);

@NgModule({
  imports: [IconCoreModule, PipesModule],
  exports: [PipesModule],
})
export class DesignSystemCoreModule {}
