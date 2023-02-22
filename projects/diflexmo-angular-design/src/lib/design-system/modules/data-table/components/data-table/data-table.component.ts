import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { debounceTime, Subject } from 'rxjs';
import { DfmDropdownItem } from '../../../dropdown/models/dropdown-item.model';
import { DfmDatasource } from '../../models/datasource.model';
import { DfmTableActionEvent } from '../../models/table-action-event.model';
import { DfmTableAction } from '../../models/table-action.model';
import { DfmTableHeader } from '../../models/table-header.model';
import { TableRow } from '../../models/table-row.model';
import { DataTableSizeService } from '../../services/data-table-size.service';
import { TableHeaderSize } from '../../types/table-header-size.type';

@Component({
  selector: 'dfm-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent<T> implements OnInit {
  @Input() data?: DfmDatasource<T>;

  @Input() rowSelectable: boolean = false;

  @Input() rowClickable: boolean = false;

  @Input() headers: Array<DfmTableHeader> = [];

  @Input() actions: Array<DfmTableAction> = [];

  @Input() stickyHeader: boolean = true;

  @Input() stickyFirstRow: boolean = true;

  private _stickyActions: boolean = true;
  public get stickyActions(): boolean {
    return this._stickyActions;
  }
  @Input() public set stickyActions(value: boolean) {
    this._stickyActions = value;
    this.dataTableSizeService.setStickyActions(value);
  }

  @Input() headerSize: TableHeaderSize = 'lg';

  @Input() selectable: boolean = false;

  @Input() clearSelected$?: Subject<void> | null;

  @Input() stickyCheckbox: boolean = true;

  @Input() noDataMessage: string = 'No data';
 
  @ContentChild('bodyRowTemplate') bodyRowTemplate!: TemplateRef<any>;
  
  @Output() sorted = new EventEmitter<DfmTableHeader>();

  @Output() rowClicked = new EventEmitter<TableRow<T>>();

  @Output() actionClicked = new EventEmitter<DfmTableActionEvent<T>>();

  @Output() selected = new EventEmitter<any[]>();

  @Output() scrolled = new EventEmitter();

  @ViewChild('tableWrapper', { static: false }) tableWrapper!: ElementRef;

  public tableSizeChanged$ = new Subject<ResizedEvent>();

  public actionsHeader: DfmTableHeader = { id: 'dfm-actions', title: '' };

  public selectedItems: Map<T, boolean> = new Map<T, boolean>();

  public get areAllSelected() {
    return this.data?.items.length && Object.values(this.selectedItems).filter((v) => v).length === this.data?.items.length;
  }

  public getSelectedById(id: T): boolean {
    if (id) {
      return this.selectedItems.get(id) ?? false;
    }
    return false;
  }

  constructor(
    public dataTableSizeService: DataTableSizeService
  ) {}

  ngOnInit(): void {
    this.tableSizeChanged$.pipe(debounceTime(100)).subscribe((event: ResizedEvent) => {
      const tableWrapperWidth = this.tableWrapper.nativeElement.offsetWidth;
      const tableWidth = event.newRect.width;
      this.dataTableSizeService.setOverflow(tableWrapperWidth < tableWidth);
    });

    if (this.selectable) {
      this.data?.items.forEach((i) => {
        this.selectedItems.set(i.id, false);
      });
    }

    if (this.clearSelected$) {
      this.clearSelected$.subscribe(() => {
        this.selectedItems = new Map<T, boolean>();
        this.selected.emit([]);
      });
    }
  }

  public actionEvent(event: DfmTableAction, row: TableRow<T>): void {
    this.actionClicked.emit({actionId: event.id, row: row});
  }
  
  public dropdownActionEvent(event: DfmDropdownItem, row: TableRow<T>): void {
    this.actionClicked.emit({actionId: event.id, row: row});
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

  public click(item: TableRow<T>): void {
    this.rowClicked.emit(item);
  }

  selectItem(selected: boolean, id: T) {
    if (!id) {
      return;
    }
    this.selectedItems.set(id, selected);

    const ids = Object.entries(this.selectedItems)
      .filter(([, value]) => value)
      .map(([key]) => key);

    this.selected.emit(ids);
  }

  selectAllItems() {
    if (!this.areAllSelected) {
      const ids = this.data?.items.map((i) => {
        if (i.id) {
          this.selectedItems.set(i.id, true);
        }
        return i.id;
      });
      this.selected.emit(ids);
    } else {
      this.selectedItems = new Map<T, boolean>();
      this.selected.emit([]);
    }
  }
}
