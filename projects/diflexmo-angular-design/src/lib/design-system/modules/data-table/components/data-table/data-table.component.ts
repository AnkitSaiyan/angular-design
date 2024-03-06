import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
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
export class DataTableComponent<T> implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() data?: DfmDatasource<T>;

  @Input() rowSelectable: boolean = false;

  @Input() rowClickable: boolean = false;

  @Input() headers: Array<DfmTableHeader> = [];

  @Input() actions: Array<DfmTableAction> = [];

  @Input() stickyHeader: boolean = true;

  @Input() stickyFirstColumn: boolean = true;

  @Input() actionTemplateRef?: TemplateRef<any>;

  @Input() stickyActions: boolean = true;

  @Input() headerSize: TableHeaderSize = 'lg';

  @Input() selectable: boolean = false;

  @Input() clearSelected$?: Subject<void> | null;

  @Input() stickyCheckbox: boolean = true;

  @Input() noDataMessage: string = 'No data';

  @Input() collapseOnMobile: boolean = false;

  @Input() loading: boolean = false;

  @Input() redirectLink?: string;

  @Input() virtualScrolling: boolean = false;

  @ContentChild('bodyRowTemplate') bodyRowTemplate!: TemplateRef<any>;

  @Output() sorted = new EventEmitter<DfmTableHeader>();

  @Output() rowClicked = new EventEmitter<TableRow<T>>();

  @Output() selected = new EventEmitter<any[]>();

  @Output() scrolled = new EventEmitter();

  @Output() actionsHeaderClicked = new EventEmitter();

  @ViewChild('tableWrapper', { read: ElementRef }) tableWrapper?: ElementRef;

  @ViewChild('tableHeader') tableHeader?: ElementRef;

  @ViewChild('tableWrapper', { read: CdkVirtualScrollViewport }) cdkViewPort?: CdkVirtualScrollViewport;

  public tableSizeChanged$ = new Subject<void>();

  public selectedItems: Map<T, boolean> = new Map<T, boolean>();

  public isActionHeaderPassed: boolean = false;

  public rowHeight: number = 66;

  public noItemsHeight: number = 42;

  private isTableSizeProcessing = false;

  private unsubscribe: Subject<any> = new Subject();

  public get areAllSelected() {
    return Array.from(this.selectedItems.values()).filter((i) => i).length === this.data?.items.length;
  }

  public getSelectedById(id: T): boolean {
    if (id) {
      return this.selectedItems.get(id) ?? false;
    }
    return false;
  }

  constructor(public dataTableService: DataTableService, private changeDetectionRef: ChangeDetectorRef, private render: Renderer2) {}

  ngOnInit(): void {
    if (this.stickyActions !== false) {
      Promise.resolve(null).then(() => this.dataTableService.setStickyActions(true));
    }

    this.tableSizeChanged$
      .pipe(
        takeUntil(this.unsubscribe),
        debounceTime(100),
        tap(() => (this.isTableSizeProcessing = true)),
      )
      .subscribe(() => {
        this.dataTableService.setOverflow(false);
        this.changeDetectionRef.detectChanges();
        this.dataTableService.setOverflow(this.tableWrapper?.nativeElement.offsetWidth <= this.tableWrapper?.nativeElement.scrollWidth);
        this.isTableSizeProcessing = false;
      });

    if (this.selectable) {
      this.data?.items.forEach((i) => {
        this.selectedItems.set(i.id, false);
      });
    }

    if (this.clearSelected$) {
      this.clearSelected$.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
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

    if (changes['data'] && this.virtualScrolling) {
      if (changes['data'].previousValue?.items.length === 0 || this.data?.items.length === 0) {
        this.changeDetectionRef.detectChanges();
      }

      const itemsLength = this.data?.items.length ?? 0;
      const headerHeight = this.tableHeader?.nativeElement.getBoundingClientRect().height ?? this.rowHeight;
      const borderWidth = getComputedStyle(this.tableWrapper?.nativeElement).getPropertyValue('border-bottom-width');

      let height = Math.ceil((itemsLength ? itemsLength * this.rowHeight : this.noItemsHeight) + headerHeight);

      if (this.tableWrapper && this.tableWrapper.nativeElement.clientWidth < this.tableWrapper.nativeElement.scrollWidth) {
        height += 15;
      }

      if (this.tableWrapper) {
        this.render.setStyle(this.tableWrapper.nativeElement, 'height', `min(calc(${height}px + 2 *${borderWidth}), 100%)`);
      }

      this.cdkViewPort?.checkViewportSize();
    }
  }

  ngAfterViewInit(): void {
    if (this.cdkViewPort) {
      this.cdkViewPort.renderedRangeStream
        .pipe(
          takeUntil(this.unsubscribe),
          tap((range) => {
            if (this.tableHeader) {
              this.render.setStyle(this.tableHeader.nativeElement, 'top', `-${this.rowHeight * range.start}px`);
            }
          }),
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
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

  handleScroll() {
    if (!this.cdkViewPort) {
      return;
    }

    const { end } = this.cdkViewPort.getRenderedRange();
    const total = this.cdkViewPort.getDataLength();

    if (total === 0) {
      return;
    }

    if (end >= total) {
      this.scrolled.emit();
    }
  }
}
