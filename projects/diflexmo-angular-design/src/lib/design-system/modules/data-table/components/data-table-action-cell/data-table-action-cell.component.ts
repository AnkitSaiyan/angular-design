import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { DataTableService } from '../../services/data-table.service';

@Component({
  selector: 'dfm-data-table-action-cell',
  templateUrl: './data-table-action-cell.component.html',
  styleUrls: ['./data-table-action-cell.component.scss'],
})
export class DataTableActionCellComponent implements OnInit {
  @Input() stickyActions: boolean = true;

  @ContentChild('actionCellTemplate') actionCellTemplate!: TemplateRef<any>;

  constructor(public dataTableService: DataTableService) {}

  public ngOnInit(): void {
    Promise.resolve(null).then(() => this.dataTableService.setHasActions(true));
  }
}
