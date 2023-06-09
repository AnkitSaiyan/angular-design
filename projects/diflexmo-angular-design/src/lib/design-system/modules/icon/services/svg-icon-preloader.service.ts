import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { Observable, of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { SvgIconPreloaderConfig } from '../configs/svg-icon-preloader-config';
import { SvgIconFile } from '../models/svg-icon-file';

@Injectable({
  providedIn: 'root',
})
export class SvgIconPreloaderService {
  private configUrl: string = './assets/icons.json';

  constructor(private httpClient: HttpClient, @Optional() config: SvgIconPreloaderConfig, private iconRegistry: SvgIconRegistryService) {
    if (config && config.configUrl) {
      this.configUrl = config.configUrl;
    }
  }

  loadConfig(): Observable<SvgIconFile[]> {
    return this.httpClient.get<SvgIconFile[]>(this.configUrl).pipe(
      take(1),
      catchError((err) => {
        console.error('An error occurred loading the icons:\n', err, '\nNo icons will be loaded.');
        return of([]);
      }),
      tap((iconFiles: SvgIconFile[]) => {
        iconFiles.forEach((i: SvgIconFile) => {
          this.iconRegistry.loadSvg(i.iconPath, i.iconName)?.pipe(take(1)).subscribe();
        });
      }),
    );
  }
}
