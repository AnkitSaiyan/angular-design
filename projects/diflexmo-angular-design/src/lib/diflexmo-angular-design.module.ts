import { NgModule } from '@angular/core';
import { DesignSystemModule } from './design-system/design-system.module';

@NgModule({
  imports: [DesignSystemModule],
  exports: [DesignSystemModule],
})
export class DiflexmoAngularDesignModule {}
