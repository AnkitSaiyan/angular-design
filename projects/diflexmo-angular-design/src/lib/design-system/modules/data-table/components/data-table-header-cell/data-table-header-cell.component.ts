import { Component, Input } from '@angular/core';
import { DfmTableHeader } from '../../models/table-header.model';
import { TableHeaderSize } from '../../types/table-header-size.type';

@Component({
  selector: 'dfm-data-table-header-cell',
  templateUrl: './data-table-header-cell.component.html',
  styleUrls: ['./data-table-header-cell.component.scss'],
})
export class DataTableHeaderCellComponent {
  @Input() header?: DfmTableHeader;

  @Input() headerSize: TableHeaderSize = 'lg';
}
