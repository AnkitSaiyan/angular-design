import { NgModule } from '@angular/core';
import { DomChangeDirective } from './dom-change.directive';

@NgModule({
  declarations: [DomChangeDirective],
  exports: [DomChangeDirective],
})
export class DirectivesModule {}
