import { APP_INITIALIZER, EnvironmentProviders, NgModule, makeEnvironmentProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { IconComponent } from './components/icon/icon.component';
import { FeaturedIconComponent } from './components/featured-icon/featured-icon.component';
import { IconConfig } from './configs/icon-config';
import { SvgIconPreloaderConfig } from './configs/svg-icon-preloader-config';
import { SvgIconPreloaderService } from './services/svg-icon-preloader.service';

function initConfig(service: SvgIconPreloaderService) {
  return () => service.loadConfig();
}

export function provideIcons(iconConfig?: IconConfig): EnvironmentProviders {
  const assetsPath = iconConfig?.assetsPath ?? '../assets';
  const configUrl = `${assetsPath.replace('//+$/', '')}/jsons/icons-config.json`;

  return makeEnvironmentProviders([
    AngularSvgIconModule.forRoot({}).providers || [],
    {
      provide: SvgIconPreloaderConfig,
      useValue: { configUrl },
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [SvgIconPreloaderService],
      multi: true,
    },
  ]);
}

@NgModule({
  declarations: [IconComponent, FeaturedIconComponent],
  imports: [CommonModule, AngularSvgIconModule, HttpClientModule],
  exports: [IconComponent, FeaturedIconComponent],
})
export class DfmIconModule {}
