import { NgModule } from '@angular/core';
import { DfmDomChangeDirective } from './dfm-dom-change.directive';
import { DfmResizeDirective } from './dfm-resize.directive';

@NgModule({
  declarations: [DfmDomChangeDirective, DfmResizeDirective],
  exports: [DfmDomChangeDirective, DfmResizeDirective],
})
export class DfmDirectivesModule {}
