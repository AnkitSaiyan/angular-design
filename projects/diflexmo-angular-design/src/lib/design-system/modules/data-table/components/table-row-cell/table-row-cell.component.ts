import { Component, Input } from '@angular/core';

@Component({
  selector: 'dfm-table-row-cell',
  templateUrl: './table-row-cell.component.html',
  styleUrls: ['./table-row-cell.component.scss']
})
export class TableRowCellComponent {

  @Input() propagateClick: boolean = true;

  @Input() contentAlign: 'right' | 'left' = 'left';

  public propagateEvent(clickEvent: any): void {
    if (!this.propagateClick) {
      clickEvent.stopPropagation();
    }
  }
}
