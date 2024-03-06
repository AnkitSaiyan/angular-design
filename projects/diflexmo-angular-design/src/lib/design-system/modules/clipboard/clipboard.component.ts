import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'dfm-clipboard',
  template: `
    <div class="dfm-clipboard d-flex dfm-gap-8 show-hidden" #container>
      <div #content class="content" [ngbTooltip]="clip" [disableTooltip]="!isEllipsisActive()" container="body">
        <ng-content></ng-content>
      </div>
      <ng-container *ngIf="!disabled">
        <ng-container *ngIf="!isCopied; else copiedNgTemp">
          <div
            (cbOnSuccess)="copySuccess($event)"
            ngxClipboard
            [cbContent]="clip"
            [container]="container"
            class="d-flex pointer icon-15 align-self-center"
            [ngClass]="{ hide: !alwaysVisible }"
            (click)="$event.stopPropagation(); $event.preventDefault()"
          >
            <dfm-icon name="copy-06" class="copy-icon" [ngbTooltip]="copyToClipboardText" container="body"></dfm-icon>
          </div>
        </ng-container>
        <ng-template #copiedNgTemp>
          <div
            class="pointer icon-15 align-self-center"
            (click)="$event.stopPropagation(); $event.preventDefault()"
            [ngbTooltip]="copiedToClipboardText"
            container="body"
          >
            <dfm-icon name="check" class="copied-icon" [ngClass]="{ hide: !alwaysVisible }"></dfm-icon>
          </div>
        </ng-template>
      </ng-container>
    </div>
  `,
  styleUrls: ['./clipboard.component.scss'],
})
export class ClipboardComponent implements OnInit {
  @Input() clip: string = '';

  @Input() alwaysVisible: boolean = false;

  @Input() disabled: boolean = false;

  @ViewChild('content') contentElementRef?: ElementRef;

  public isCopied: boolean = false;

  public copyToClipboardText: string = 'Copy to clipboard';

  public copiedToClipboardText: string = 'Copied!';

  private copyToClipboardTextKey: string = 'DESIGN_SYSTEM.MODULES.CLIPBOARD.COPY_TEXT';

  private copiedToClipboardTextKey: string = 'DESIGN_SYSTEM.MODULES.CLIPBOARD.COPIED_TEXT';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.get(this.copyToClipboardTextKey).subscribe((t) => {
      if (t !== this.copyToClipboardTextKey) {
        this.copyToClipboardText = t;
      }
    });

    this.translateService.get(this.copiedToClipboardTextKey).subscribe((t) => {
      if (t !== this.copiedToClipboardTextKey) {
        this.copiedToClipboardText = t;
      }
    });
  }

  public copySuccess(event: any): void {
    this.isCopied = event.isSuccess;

    setTimeout(() => {
      this.isCopied = false;
    }, 1000);
  }

  public isEllipsisActive(): boolean {
    if (this.contentElementRef) {
      return this.getWidthDifference(this.contentElementRef);
    }

    return false;
  }

  private getWidthDifference(element: ElementRef) {
    return element.nativeElement.offsetWidth < element.nativeElement.scrollWidth;
  }
}
