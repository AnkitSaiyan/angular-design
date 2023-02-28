import { Component, Input, OnInit } from '@angular/core';
import { DataTableService } from '../../services/data-table.service';

@Component({
  selector: 'dfm-data-table-action',
  templateUrl: './data-table-action.component.html',
  styleUrls: ['./data-table-action.component.scss'],
})
export class DataTableActionComponent implements OnInit {
  @Input() icon: string = 'placeholder';

  @Input() tooltip: string = '';

  constructor(private dataTableService: DataTableService) {}

  ngOnInit(): void {
    this.dataTableService.setHasActions(true);
  }
}
