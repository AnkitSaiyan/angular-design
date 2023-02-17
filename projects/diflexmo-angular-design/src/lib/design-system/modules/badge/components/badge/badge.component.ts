import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeColor } from '../../types/badge-color.type';
import { BadgeFontWeight } from '../../types/badge-font-weight.type';
import { BadgeIconStyle } from '../../types/badge-icon-style.type';
import { BadgeSize } from '../../types/badge-size.type';

@Component({
  selector: 'dfm-badge',
  template: `
    <div [ngClass]="getStyles()">
      <div *ngIf="iconStyle === 'bullet'" class="dfm-bullet dfm-bullet-{{ color }}"></div>
      <dfm-icon class="dfm-badge-icon icon-12" *ngIf="iconStyle === 'icon-left'" [name]="icon"></dfm-icon>
      <ng-content></ng-content>
      <dfm-icon class="dfm-badge-icon icon-12" *ngIf="iconStyle === 'icon-right'" [name]="icon"></dfm-icon>
      <dfm-icon class="dfm-badge-icon icon-12 pointer" *ngIf="iconStyle === 'close'" name="x-close" (click)="close()"></dfm-icon>
    </div>
  `,
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  @Input() size: BadgeSize = 'sm';

  @Input() iconStyle: BadgeIconStyle = 'none';

  @Input() icon: string = 'placeholder';

  @Input() color: BadgeColor = 'primary';

  @Input() fontWeight: BadgeFontWeight = 'medium';

  @Output() closed: EventEmitter<boolean> = new EventEmitter();

  public getStyles(): string[] {
    const color: string = `dfm-badge-${this.color}`;
    const bold: string = `font-weight-${this.fontWeight}`;
    let style: string = `dfm-badge-${this.size}`;
    switch (this.iconStyle) {
      case 'none':
        break;
      case 'bullet':
        style += '-bullet';
        break;
      case 'icon-left':
        style += '-icon-left';
        break;
      case 'icon-right':
        style += '-icon-right';
        break;
      case 'avatar':
        style += '-avatar';
        break;
      case 'close':
        style += '-close';
        break;
      default:
        break;
    }

    return [`${style}`, `${color}`, `${bold}`];
  }

  public close(): void {
    this.closed.next(true);
  }
}
