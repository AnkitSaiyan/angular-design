import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'dfm-clipboard',
  template: `
    <div class="d-flex dfm-gap-8 show-hidden" #container>
      <div><ng-content></ng-content></div>
      <div [ngbTooltip]="tooltipContent" container="body">
        <ng-container *ngIf="!isCopied; else copiedNgTemp">
          <div
            (cbOnSuccess)="copySuccess($event)"
            ngxClipboard
            [cbContent]="clip"
            [container]="container"
            class="pointer icon-15 align-self-center"
            [ngClass]="{ hide: !alwaysVisible }"
            (click)="$event.stopPropagation()"
          >
            <dfm-icon name="copy-06" class="dfm-clipboard"></dfm-icon>
          </div>
        </ng-container>
        <ng-template #copiedNgTemp>
          <div class="pointer icon-15 align-self-center" (click)="$event.stopPropagation()">
            <dfm-icon name="check" class="dfm-clipboard-copied" [ngClass]="{ hide: !alwaysVisible }"></dfm-icon>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./clipboard.component.scss'],
})
export class ClipboardComponent implements OnInit {
  @Input() clip: string = '';

  @Input() alwaysVisible: boolean = false;

  public isCopied: boolean = false;

  public tooltipContent: string = '';

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
      this.tooltipContent = this.copyToClipboardText;
    });

    this.translateService.get(this.copiedToClipboardTextKey).subscribe((t) => {
      if (t !== this.copiedToClipboardTextKey) {
        this.copiedToClipboardText = t;
      }
    });
  }

  public copySuccess(event: any): void {
    this.isCopied = event.isSuccess;
    if (this.isCopied) {
      this.tooltipContent = this.copiedToClipboardText;
      setTimeout(() => {
        this.isCopied = false;
        this.tooltipContent = this.copyToClipboardText;
      }, 1000);
    }
  }
}
