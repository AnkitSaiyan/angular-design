import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AngularSvgIconPreloaderModule } from 'angular-svg-icon-preloader';

@NgModule({
  imports: [
    CommonModule,
    AngularSvgIconModule.forRoot({}),
    AngularSvgIconPreloaderModule.forRoot({ configUrl: '../../assets/jsons/icons-config.json' }),
  ],
})
export class IconCoreModule {}
