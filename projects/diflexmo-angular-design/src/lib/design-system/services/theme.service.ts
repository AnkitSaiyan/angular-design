import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, filter, takeUntil } from 'rxjs';
import { Theme } from '../enums/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private latestTheme?: Theme;

  private latestCssTheme?: Theme;

  private themeSubject$ = new ReplaySubject<Theme>();

  private cssThemeSubject$ = new ReplaySubject<Theme>();

  private destroy$ = new Subject<void>();

  public theme$ = this.themeSubject$.asObservable();

  public cssTheme$ = this.cssThemeSubject$.asObservable();

  public themeChange$ = new Subject<Theme>();

  init() {
    const themeLocalStorageSetting = localStorage.getItem('DIFLEXMO.DESIGN_SYSTEM.THEME');
    const theme = themeLocalStorageSetting ? Theme[themeLocalStorageSetting.toUpperCase() as keyof typeof Theme] : Theme.SYSTEM;

    this.themeSubject$.pipe(takeUntil(this.destroy$)).subscribe((value) => (this.latestTheme = value));
    this.cssThemeSubject$.pipe(takeUntil(this.destroy$)).subscribe((value) => (this.latestCssTheme = value));

    this.setTheme(theme);
    this.saveSetting(theme);

    this.themeChange$
      .pipe(
        takeUntil(this.destroy$),
        filter((value) => value !== undefined && value !== null),
      )
      .subscribe((value) => {
        this.setTheme(value, this.latestCssTheme);
        this.saveSetting(value);
      });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.updatePreferableTheme.bind(this));
  }

  public destroy() {
    this.destroy$.complete();
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.updatePreferableTheme);
  }

  private setTheme(theme: Theme, previousTheme: Theme | null = null) {
    const { body } = document;

    let cssTheme = theme;

    if (theme === Theme.SYSTEM) {
      cssTheme = this.isDarkPreferable() ? Theme.DARK : Theme.LIGHT;
    }

    if (previousTheme) {
      body.classList.remove(previousTheme);
    }

    body.classList.add(cssTheme);

    this.themeSubject$.next(theme);
    this.cssThemeSubject$.next(cssTheme);
  }

  private saveSetting(theme: Theme) {
    localStorage.setItem('DIFLEXMO.DESIGN_SYSTEM.THEME', theme);
  }

  private isDarkPreferable() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private updatePreferableTheme() {
    if (this.latestTheme === Theme.SYSTEM) {
      this.themeChange$.next(Theme.SYSTEM);
    }
  }
}
