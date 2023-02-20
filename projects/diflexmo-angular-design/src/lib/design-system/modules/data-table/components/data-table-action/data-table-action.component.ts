import { Component, Input } from '@angular/core';

@Component({
  selector: 'dfm-data-table-action',
  templateUrl: './data-table-action.component.html',
  styleUrls: ['./data-table-action.component.scss']
})
export class DataTableActionComponent {

  @Input() icon: string = 'placeholder';

  @Input() tooltip: string = '';

}
