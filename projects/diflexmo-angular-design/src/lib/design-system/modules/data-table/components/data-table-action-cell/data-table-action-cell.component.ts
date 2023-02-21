import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { DataTableSizeService } from '../../services/data-table-size.service';

@Component({
  selector: 'dfm-data-table-action-cell',
  templateUrl: './data-table-action-cell.component.html',
  styleUrls: ['./data-table-action-cell.component.scss']
})
export class DataTableActionCellComponent {

  @Input() stickyActions: boolean = true;

  @ContentChild('actionCellTemplate') actionCellTemplate!: TemplateRef<any>;
  
  constructor(
    public dataTableSizeService: DataTableSizeService
  ) { }
}
