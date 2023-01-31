import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { debounceTime, Subject } from 'rxjs';
import { DfmDatasource } from '../../models/datasource.model';
import { DfmTableAction } from '../../models/table-action.model';
import { DfmTableHeader } from '../../models/table-header.model';
import { TableRow } from '../../models/table-row.model';
import { TableHeaderSize } from '../../types/table-header-size.type';

@Component({
  selector: 'dfm-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() data?: DfmDatasource;

  @Input() rowSelectable: boolean = false;

  @Input() rowClickable: boolean = false;

  @Input() headers: Array<DfmTableHeader> = [];

  @Input() actions: Array<DfmTableAction> = [];

  @Input() showActions: boolean = true;

  @Input() stickyActions: boolean = true;

  @Input() stickyHeader: boolean = true;

  @Input() stickyFirstRow: boolean = true;

  @Input() headerSize: TableHeaderSize = 'lg';

  @Input() selectable: boolean = false;

  @Input() clearSelected$?: Subject<void> | null;

  @ContentChild('bodyRowTemplate') bodyRowTemplate!: TemplateRef<any>;

  @Output() sorted = new EventEmitter<DfmTableHeader>();

  @Output() rowClicked = new EventEmitter<TableRow>();

  @Output() actionClicked = new EventEmitter<DfmTableAction>();

  @Output() selected = new EventEmitter<any[]>();

  public isHorizontalScrollDisplayed: boolean = false;

  public tableSizeChanged$ = new Subject<ResizedEvent>();

  public actionsHeader: DfmTableHeader = { id: 'dfm-actions', title: '' };

  public selectedItems: { [key: string | number]: boolean } = {};

  public get areAllSelected() {
    return this.data?.items.length && Object.values(this.selectedItems).filter((v) => v).length === this.data?.items.length;
  }

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.tableSizeChanged$.pipe(debounceTime(100)).subscribe((event: ResizedEvent) => {
      const tableWrapperWidth = this.elRef.nativeElement.offsetWidth;
      const tableWidth = event.newRect.width;
      this.isHorizontalScrollDisplayed = tableWrapperWidth < tableWidth;
    });

    if (this.selectable) {
      this.data?.items.forEach((i) => (this.selectedItems[i.id] = false));
    }

    if (this.clearSelected$) {
      this.clearSelected$.subscribe(() => {
        this.selectedItems = {};
        this.selected.emit([]);
      });
    }
  }

  public checkTableSize(event: ResizedEvent): void {
    this.tableSizeChanged$.next(event);
  }

  public sortClicked(headerTitle: string): void {
    const header = this.headers.find((h) => h.title === headerTitle);
    if (!header || !header.isSortable) {
      return;
    }

    this.headers
      .filter((t) => t.title !== headerTitle)
      .filter((h) => h.isSortable)
      .forEach((v) => (v.sort = 'None'));

    header.sort = header.sort === 'Asc' || header.sort === 'None' ? 'Desc' : 'Asc';
    this.sorted.emit(header);
  }

  public click(item: TableRow): void {
    this.rowClicked.emit(item);
  }

  selectItem(selected: boolean, id: string) {
    this.selectedItems[id] = selected;

    const ids = Object.entries(this.selectedItems)
      .filter(([, value]) => value)
      .map(([key]) => key);

    this.selected.emit(ids);
  }

  selectAllItems() {
    if (!this.areAllSelected) {
      const ids = this.data?.items.map((i) => {
        this.selectedItems[i.id] = true;
        return i.id;
      });
      this.selected.emit(ids);
    } else {
      this.selectedItems = {};
      this.selected.emit([]);
    }
  }
}
