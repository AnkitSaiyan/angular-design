import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { DfmDatasource } from '../../models/datasource.model';
import { DfmTableHeader } from '../../models/table-header.model';
import { TableRow } from '../../models/table-row.model';
import { TableHeaderSize } from '../../types/table-header-size.type';

@Component({
  selector: 'dfm-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() data?: DfmDatasource;

  @Input() collapseOnMobile: boolean = true;

  @Input() rowSelectable: boolean = false;

  @Input() rowClickable: boolean = false;

  @Input() headers: Array<DfmTableHeader> = [];

  @Input() fullWidth: boolean = true;

  @Input() stickyHeader: boolean = true;

  @Input() headerSize: TableHeaderSize = 'lg';

  @ContentChild('bodyRowTemplate') bodyRowTemplate!: TemplateRef<any>;

  @Output() sorted = new EventEmitter<DfmTableHeader>();

  @Output() rowClicked = new EventEmitter<TableRow>();

  constructor() { }

  ngOnInit(): void {
  }

  public sortClicked(headerTitle: string): void {
    const header = this.headers.find(h => h.title === headerTitle);
    if (!header || !header.isSortable) {
      return;
    }

    this.headers.filter(t => t.title !== headerTitle).filter(h => h.isSortable).forEach(v => v.sort = 'None');

    header.sort = header.sort === 'Asc' || header.sort === 'None' ? 'Desc' : 'Asc';
    this.sorted.emit(header);
  }

  public click(item: TableRow): void {
    this.rowClicked.emit(item);
  }
}
