import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClipboardService {
  private copySubject: Subject<string> = new Subject<string>();

  constructor(private translationService: TranslateService) {
    this.copySubject
      .pipe(
        debounceTime(300),
        map((x) => this.copyToClipboard(x)),
      )
      .subscribe();
  }

  public emitToClipboard(value: string) {
    this.copySubject.next(value);
  }

  private copyToClipboard(value: string) {
    // https://stackoverflow.com/questions/49102724/angular-5-copy-to-clipboard
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
