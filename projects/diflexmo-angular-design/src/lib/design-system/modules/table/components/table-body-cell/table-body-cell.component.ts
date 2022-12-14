import { Component, Input } from '@angular/core';

@Component({
  selector: 'dfm-table-body-cell',
  templateUrl: './table-body-cell.component.html',
  styleUrls: ['./table-body-cell.component.scss'],
})
export class TableBodyCellComponent {
  @Input() propagateClick: boolean = true;

  @Input() contentAlign: 'right' | 'left' = 'left';

  propagateEvent(clickEvent: any) {
    if (!this.propagateClick) {
      clickEvent.stopPropagation();
    }
  }
}
