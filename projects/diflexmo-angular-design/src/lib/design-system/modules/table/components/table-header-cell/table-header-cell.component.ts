import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortOrder } from '../../models/sort-order';

@Component({
  selector: 'dfm-table-header-cell',
  templateUrl: './table-header-cell.component.html',
  styleUrls: ['./table-header-cell.component.scss'],
})
export class TableHeaderCellComponent {
  @Input() sortable: boolean = false;

  @Output() sort = new EventEmitter<SortOrder>();

  public sortOrder = SortOrder.Asc;

  public SortOrder = SortOrder;

  sortClicked() {
    if (!this.sortable) {
      return;
    }

    this.sortOrder = this.sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;
    this.sort.emit(this.sortOrder);
  }
}
