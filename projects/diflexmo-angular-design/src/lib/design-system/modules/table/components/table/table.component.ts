import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { debounceTime, Subject } from 'rxjs';
import { TableItem } from '../../models/table-item';

@Component({
  selector: 'dfm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() items: TableItem[] = [];

  @Input() selectable: boolean = false;

  @Input() clearSelected$?: Subject<void> | null;

  @Input() rowClickable: boolean = false;

  @Input() compactHeader: boolean = false;

  @Output() selected = new EventEmitter<string[]>();

  @Output() rowClicked = new EventEmitter<TableItem>();

  @ContentChild('headerRowTemplate') headerRowTemplate!: TemplateRef<any>;

  @ContentChild('bodyRowTemplate') bodyRowTemplate!: TemplateRef<any>;

  @ViewChild('tableWrapper', { static: false }) tableWrapper!: ElementRef;

  public tableSizeChanged$ = new Subject<ResizedEvent>();

  public isHorizontalScrollDisplayed: boolean = false;

  public selectedItems: { [key: string]: boolean } = {};

  public get areAllSelected() {
    return this.items.length && Object.values(this.selectedItems).filter((v) => v).length === this.items.length;
  }

  ngOnInit(): void {
    this.tableSizeChanged$.pipe(debounceTime(100)).subscribe((event: ResizedEvent) => {
      const tableWrapperWidth = this.tableWrapper.nativeElement.offsetWidth;
      const tableWidth = event.newRect.width;
      this.isHorizontalScrollDisplayed = tableWrapperWidth < tableWidth;
    });

    if (this.selectable) {
      this.items.forEach((i) => (this.selectedItems[i.id] = false));
    }

    if (this.clearSelected$) {
      this.clearSelected$.subscribe(() => {
        this.selectedItems = {};
        this.selected.emit([]);
      });
    }
  }

  checkTableSize(event: ResizedEvent) {
    this.tableSizeChanged$.next(event);
  }

  selectAllItems() {
    if (!this.areAllSelected) {
      const ids = this.items.map((i) => {
        this.selectedItems[i.id] = true;
        return i.id;
      });
      this.selected.emit(ids);
    } else {
      this.selectedItems = {};
      this.selected.emit([]);
    }
  }

  selectItem(selected: boolean, id: string) {
    this.selectedItems[id] = selected;

    const ids = Object.entries(this.selectedItems)
      .filter(([, value]) => value)
      .map(([key]) => key);

    this.selected.emit(ids);
  }

  click(item: TableItem) {
    this.rowClicked.emit(item);
  }
}
