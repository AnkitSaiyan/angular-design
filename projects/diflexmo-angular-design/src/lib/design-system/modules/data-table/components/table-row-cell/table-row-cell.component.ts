import { AfterViewInit, Component, ContentChild, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Tooltip } from 'bootstrap';

@Component({
  selector: 'dfm-table-row-cell',
  templateUrl: './table-row-cell.component.html',
  styleUrls: ['./table-row-cell.component.scss']
})
export class TableRowCellComponent implements AfterViewInit, OnDestroy {
  
  @Input() propagateClick: boolean = true;

  @Input() contentAlign: 'right' | 'left' = 'left';

  @Input() widthStyle?: string;

  @Input() maxWidthStyle?: string;

  @ContentChild('projected', { static: false }) projectedContent: any;

  @ViewChild('tableCell', { read: ElementRef }) tableCell!: ElementRef;

  private tooltips: Tooltip[] = [];

  ngAfterViewInit(): void {
    if (this.isEllipsisActive(this.projectedContent.nativeElement.innerHTML)) {
      const copyTooltip = new Tooltip(this.tableCell.nativeElement, { title: this.projectedContent.nativeElement.innerHTML });

      this.tooltips.push(copyTooltip);
    }
  }

  public propagateEvent(clickEvent: any): void {
    if (!this.propagateClick) {
      clickEvent.stopPropagation();
    }
  }

  ngOnDestroy(): void {
    this.tooltips.forEach((t) => t.dispose());
  }

  isEllipsisActive(e: any) {
    return (e.offsetWidth < e.scrollWidth);
  }
}
