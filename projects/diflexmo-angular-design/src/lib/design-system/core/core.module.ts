import { NgModule, SkipSelf } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeBe from '@angular/common/locales/nl-BE';
import { PipesModule } from '../pipes/pipes.module';

registerLocaleData(localeBe);

@NgModule({
  declarations: [],
  imports: [CommonModule, PipesModule],
  exports: [PipesModule],
})
export class DfmCoreModule {
  constructor(@SkipSelf() coreModule: DfmCoreModule) {
    if (!coreModule) {
      throw new Error('DfmCoreModule should only be imported once in the app module');
    }
  }
}
