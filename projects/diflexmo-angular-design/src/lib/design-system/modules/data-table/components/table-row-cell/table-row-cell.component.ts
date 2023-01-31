import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'dfm-table-row-cell',
  templateUrl: './table-row-cell.component.html',
  styleUrls: ['./table-row-cell.component.scss'],
})
export class TableRowCellComponent {
  @Input() propagateClick: boolean = true;

  @Input() contentAlign: 'right' | 'left' = 'left';

  @Input() widthStyle?: string;

  @Input() maxWidthStyle?: string = '40vw';

  @Input() fullContent?: string;

  @Input() collapsePaddingX: boolean = false;

  @ViewChild('tableCell', { read: ElementRef }) tableCell!: ElementRef;

  // private tooltips: Tooltip[] = [];

  // ngAfterViewInit(): void {
  //   if (this.isEllipsisActive() && this.fullContent) {
  //     const copyTooltip = new Tooltip(this.tableCell.nativeElement, { title: this.fullContent });

  //     this.tooltips.push(copyTooltip);
  //   }
  // }

  public propagateEvent(clickEvent: any): void {
    if (!this.propagateClick) {
      clickEvent.stopPropagation();
    }
  }

  // ngOnDestroy(): void {
  //   this.tooltips.forEach((t) => t.dispose());
  // }

  isEllipsisActive() {
    return this.tableCell.nativeElement.offsetWidth < this.tableCell.nativeElement.scrollWidth;
  }
}
