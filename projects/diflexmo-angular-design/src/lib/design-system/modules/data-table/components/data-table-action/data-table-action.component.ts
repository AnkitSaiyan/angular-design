import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataTableService } from '../../services/data-table.service';

@Component({
  selector: 'dfm-data-table-action',
  templateUrl: './data-table-action.component.html',
  styleUrls: ['./data-table-action.component.scss'],
})
export class DataTableActionComponent implements OnInit {
  @Input() icon: string = 'placeholder';

  @Input() tooltip: string = '';

  @Output() click = new EventEmitter<Event>();

  constructor(private dataTableService: DataTableService) {}

  ngOnInit(): void {
    Promise.resolve(null).then(() => this.dataTableService.setHasActions(true));
  }

  handleClick(event: Event) {
    this.click.emit(event);
    event.preventDefault();
    event.stopPropagation();
  }
}
