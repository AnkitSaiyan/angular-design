import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Tooltip } from 'bootstrap';

@Component({
  selector: 'dfm-clipboard',
  template: `
    <div class="d-flex dfm-gap-8 show-hidden">
      <div><ng-content></ng-content></div>
      <div #container class="pointer icon-15 align-self-center">
        <dfm-icon
          ngxClipboard
          [cbContent]="clip"
          [container]="container"
          #copyIcon
          class="dfm-clipboard"
          (click)="copyToClipboard(); $event.stopPropagation()"
          [ngClass]="{ hide: !alwaysVisible, 'd-none': isCopied }"
          name="copy-06"
        >
        </dfm-icon>
        <dfm-icon
          #copiedIcon
          (click)="$event.stopPropagation()"
          name="check"
          class="dfm-clipboard-copied"
          [ngClass]="{ hide: !alwaysVisible, 'd-none': !isCopied }"
        ></dfm-icon>
      </div>
    </div>
  `,
  styleUrls: ['./clipboard.component.scss'],
})
export class ClipboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() clip: string = '';

  @Input() alwaysVisible: boolean = false;

  @ViewChild('copyIcon', { read: ElementRef }) copyIcon!: ElementRef;

  @ViewChild('copiedIcon', { read: ElementRef }) copiedIcon!: ElementRef;

  public isCopied: boolean = false;

  private copyToClipboardText: string = 'Copy to clipboard';

  private copiedToClipboardText: string = 'Copied!';

  private copyToClipboardTextKey: string = 'DESIGN_SYSTEM.MODULES.CLIPBOARD.COPY_TEXT';

  private copiedToClipboardTextKey: string = 'DESIGN_SYSTEM.MODULES.CLIPBOARD.COPIED_TEXT';

  private tooltips: Tooltip[] = [];

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

  ngAfterViewInit(): void {
    const copyTooltip = new Tooltip(this.copyIcon.nativeElement, { title: this.copyToClipboardText });
    const copiedTooltip = new Tooltip(this.copiedIcon.nativeElement, { title: this.copiedToClipboardText });

    this.tooltips.push(copyTooltip, copiedTooltip);
  }

  ngOnDestroy(): void {
    this.tooltips.forEach((t) => t.dispose());
  }

  public copyToClipboard(): void {
    this.isCopied = true;

    setTimeout(() => {
      this.isCopied = false;
    }, 1000);
  }
}
