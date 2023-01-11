import { Component, Input } from '@angular/core';

@Component({
  selector: 'dfm-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent {

  @Input() propagateClick: boolean = true;

  @Input() contentAlign: 'right' | 'left' = 'left';

  propagateEvent(clickEvent: any) {
    if (!this.propagateClick) {
      clickEvent.stopPropagation();
    }
  }

}
