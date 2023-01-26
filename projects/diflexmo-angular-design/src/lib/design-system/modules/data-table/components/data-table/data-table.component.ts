import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, Renderer2, TemplateRef } from '@angular/core';
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
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  // @HostBinding('class.dfm-table-wrapper-collapse') tableWrapperClass: boolean = true;
  
  // private _removeMarginsOnMobile: boolean = true;
  // @Input() public set removeMarginsOnMobile(value: boolean) {
  //   this._removeMarginsOnMobile = value;
  //   if (this._removeMarginsOnMobile) {
  //     this.renderer.addClass(this.elRef, 'dfm-table-wrapper-collapse');
  //   } else {
  //     this.renderer.removeClass(this.elRef, 'dfm-table-wrapper-collapse');
  //   }
  // }

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

  @ContentChild('bodyRowTemplate') bodyRowTemplate!: TemplateRef<any>;

  @Output() sorted = new EventEmitter<DfmTableHeader>();

  @Output() rowClicked = new EventEmitter<TableRow>();

  @Output() actionClicked = new EventEmitter<DfmTableAction>();

  public isHorizontalScrollDisplayed: boolean = false;

  public tableSizeChanged$ = new Subject<ResizedEvent>();

  public actionsHeader: DfmTableHeader = {id: 'dfm-actions', title: ''};

  constructor(
    private elRef:ElementRef,
  ) { }

  ngOnInit(): void {
    this.tableSizeChanged$
      .pipe(
        debounceTime(100)
      ).subscribe((event: ResizedEvent) => {
      const tableWrapperWidth = this.elRef.nativeElement.offsetWidth;
      const tableWidth = event.newRect.width;
      this.isHorizontalScrollDisplayed = tableWrapperWidth < tableWidth;
    });
  }

  public checkTableSize(event: ResizedEvent): void {
    this.tableSizeChanged$.next(event);
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
