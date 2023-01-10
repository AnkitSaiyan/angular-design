import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DfmTableHeader } from '../../models/table-header.model';
import { TableHeaderSize } from '../../types/table-header-size.type';

@Component({
  selector: 'dfm-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  // @Input() items: [] = [];

  @Input() rowSelectable: boolean = false;

  @Input() rowClickable: boolean = false;

  @Input() headers: Array<DfmTableHeader> = [];

  @Input() fullWidth: boolean = true;

  @Input() stickyHeader: boolean = true;

  @Input() headerSize: TableHeaderSize = 'lg';

  @Output() sorted = new EventEmitter<DfmTableHeader>();

  constructor() { }

  ngOnInit(): void {
  }

  public sortClicked(headerTitle: string): void {
    const header = this.headers.find(h => h.title === headerTitle);
    if (!header || !header.isSortable) {
      return;
    }

    this.headers.filter(h => h.isSortable).forEach(v => v.sort = 'None');

    header.sort = header.sort === 'Asc' || header.sort === 'None' ? 'Desc' : 'Asc';
    this.sorted.emit(header);
  }
}
