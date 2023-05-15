import { NgModule } from '@angular/core';
import { IconCoreModule } from './modules/icon/icon.core.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [IconCoreModule, PipesModule],
  exports: [PipesModule],
})
export class DesignSystemCoreModule {}
