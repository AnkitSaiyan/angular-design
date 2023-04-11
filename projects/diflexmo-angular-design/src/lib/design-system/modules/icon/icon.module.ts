import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconPreloaderModule } from 'angular-svg-icon-preloader';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { IconComponent } from './components/icon/icon.component';
import { FeaturedIconComponent } from './components/featured-icon/featured-icon.component';

@NgModule({
  declarations: [IconComponent, FeaturedIconComponent],
  imports: [CommonModule, AngularSvgIconModule, AngularSvgIconPreloaderModule, HttpClientModule],
  exports: [IconComponent, FeaturedIconComponent],
})
export class NgDfmIconModule {}
