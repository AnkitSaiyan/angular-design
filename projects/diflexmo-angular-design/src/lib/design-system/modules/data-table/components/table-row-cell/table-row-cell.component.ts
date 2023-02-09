import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'dfm-table-row-cell',
  templateUrl: './table-row-cell.component.html',
  styleUrls: ['./table-row-cell.component.scss'],
})
export class TableRowCellComponent implements AfterViewInit {
  @Input() propagateClick: boolean = true;

  @Input() contentAlign: 'right' | 'left' = 'left';

  @Input() widthStyle?: string;

  @Input() maxWidthStyle?: string = '40vw';

  @Input() fullContent?: string;

  @Input() collapsePaddingX: boolean = false;

  @ViewChild('tableCell', { read: ElementRef }) tableCell!: ElementRef;

  private isInit: boolean = false;

  public get hasFullContent(): boolean {
    if (this.fullContent) {
      return true;
    }

    return false;
  }

  ngAfterViewInit(): void {
    Promise.resolve(null).then(() => (this.isInit = true));
  }

  public canShowTooltip(): boolean {
    if (!this.isInit) {
      return false;
    }

    return !this.hasFullContent || !this.isEllipsisActive();
  }

  public propagateEvent(clickEvent: any): void {
    if (!this.propagateClick) {
      clickEvent.stopPropagation();
    }
  }

  public isEllipsisActive(): boolean {
    return this.tableCell.nativeElement.offsetWidth < this.tableCell.nativeElement.scrollWidth;
  }
}
