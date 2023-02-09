import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'dfm-clipboard',
  template: `
    <div class="d-flex dfm-gap-8 show-hidden">
      <div><ng-content></ng-content></div>
      <ng-container *ngIf="!isCopied; else copiedNgTemp">
        <div class="pointer icon-15 align-self-center" (click)="$event.stopPropagation()" [ngbTooltip]="copiedToClipboardText" container="body">
          <dfm-icon name="check" class="dfm-clipboard-copied" [ngClass]="{ hide: !alwaysVisible }"></dfm-icon>
        </div>
      </ng-container>
      <ng-template #copiedNgTemp>
        <div
          (cbOnSuccess)="copySuccess($event)"
          ngxClipboard
          [cbContent]="clip"
          class="pointer icon-15 align-self-center"
          [ngClass]="{ hide: !alwaysVisible }"
          (click)="$event.stopPropagation()"
          [ngbTooltip]="copyToClipboardText"
          container="body"
        >
          <dfm-icon name="copy-06" class="dfm-clipboard"></dfm-icon>
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./clipboard.component.scss'],
})
export class ClipboardComponent implements OnInit {
  @Input() clip: string = '';

  @Input() alwaysVisible: boolean = false;

  public isCopied: boolean = false;

  private copyToClipboardText: string = 'Copy to clipboard';

  private copiedToClipboardText: string = 'Copied!';

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
}
