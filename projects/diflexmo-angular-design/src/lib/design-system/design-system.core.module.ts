import { NgModule, SkipSelf } from '@angular/core';
import { IconCoreModule } from './modules/icon/icon.core.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [IconCoreModule, PipesModule],
  exports: [PipesModule],
})
export class DesignSystemCoreModule {
  constructor(@SkipSelf() coreModule: DesignSystemCoreModule) {
    if (!coreModule) {
      throw new Error('DfmCoreModule should only be imported once in the app module');
    }
  }
}
