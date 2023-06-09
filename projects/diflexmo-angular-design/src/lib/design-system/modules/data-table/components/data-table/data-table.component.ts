import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { debounceTime, Subject, tap } from 'rxjs';
import { DfmDatasource } from '../../models/datasource.model';
import { DfmTableAction } from '../../models/table-action.model';
import { DfmTableHeader } from '../../models/table-header.model';
import { TableRow } from '../../models/table-row.model';
import { DataTableService } from '../../services/data-table.service';
import { TableHeaderSize } from '../../types/table-header-size.type';

@Component({
  selector: 'dfm-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [DataTableService],
})
export class DataTableComponent<T> implements OnInit, OnChanges {
  @Input() data?: DfmDatasource<T>;

  @Input() rowSelectable: boolean = false;

  @Input() rowClickable: boolean = false;

  @Input() headers: Array<DfmTableHeader> = [];

  @Input() actions: Array<DfmTableAction> = [];

  @Input() stickyHeader: boolean = true;

  @Input() stickyFirstColumn: boolean = true;

  @Input() actionsHeader?: string;

  @Input() actionsHeaderIcon?: string;

  @Input() actionsHeaderTooltip?: string;

  @Input() stickyActions: boolean = true;

  @Input() headerSize: TableHeaderSize = 'lg';

  @Input() selectable: boolean = false;

  @Input() clearSelected$?: Subject<void> | null;

  @Input() stickyCheckbox: boolean = true;

  @Input() noDataMessage: string = 'No data';

  @Input() collapseOnMobile: boolean = false;

  @ContentChild('bodyRowTemplate') bodyRowTemplate!: TemplateRef<any>;

  @Output() sorted = new EventEmitter<DfmTableHeader>();

  @Output() rowClicked = new EventEmitter<TableRow<T>>();

  @Output() selected = new EventEmitter<any[]>();

  @Output() scrolled = new EventEmitter();

  @Output() actionsHeaderClicked = new EventEmitter();

  @ViewChild('tableWrapper', { static: false }) tableWrapper!: ElementRef;

  public tableSizeChanged$ = new Subject<void>();

  public selectedItems: Map<T, boolean> = new Map<T, boolean>();

  public isActionHeaderPassed: boolean = false;

  private isTableSizeProcessing = false;

  public get areAllSelected() {
    return Array.from(this.selectedItems.values()).filter((i) => i).length === this.data?.items.length;
  }

  public getSelectedById(id: T): boolean {
    if (id) {
      return this.selectedItems.get(id) ?? false;
    }
    return false;
  }

  constructor(public dataTableService: DataTableService, private changeDetectionRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.stickyActions !== false) {
      Promise.resolve(null).then(() => this.dataTableService.setStickyActions(true));
    }

    this.tableSizeChanged$
      .pipe(
        debounceTime(100),
        tap(() => (this.isTableSizeProcessing = true)),
      )
      .subscribe(() => {
        this.dataTableService.setOverflow(false);
        this.changeDetectionRef.detectChanges();
        this.dataTableService.setOverflow(this.tableWrapper.nativeElement.offsetWidth <= this.tableWrapper.nativeElement.scrollWidth);
        this.isTableSizeProcessing = false;
      });

    if (this.selectable) {
      this.data?.items.forEach((i) => {
        this.selectedItems.set(i.id, false);
      });
    }

    if (this.clearSelected$) {
      this.clearSelected$.subscribe(() => {
        this.selectedItems.clear();
        this.selected.emit([]);
      });
    }

    this.isActionHeaderPassed = !!this.headers.find((h) => h.isAction);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stickyActions'] && changes['stickyActions'].currentValue !== changes['stickyActions'].previousValue) {
      this.dataTableService.setStickyActions(changes['stickyActions'].currentValue);
    }
  }

  public checkTableSize(): void {
    if (!this.isTableSizeProcessing) {
      this.tableSizeChanged$.next();
    }
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

    const ids: T[] = [];

    this.selectedItems.forEach((value, key) => {
      if (value) {
        ids.push(key);
      }
    });

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
      this.selectedItems.clear();
      this.selected.emit([]);
    }
  }
}
