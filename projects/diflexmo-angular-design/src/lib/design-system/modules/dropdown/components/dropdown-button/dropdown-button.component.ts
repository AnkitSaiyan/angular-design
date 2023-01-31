import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DfmDropdownItem } from '../../models/dropdown-item.model';

@Component({
  selector: 'dfm-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss'],
})
export class DropdownButtonComponent {
  useEllipsis: boolean = true;

  @Input() items: Array<DfmDropdownItem> = [];

  @Output() actionClicked = new EventEmitter<DfmDropdownItem>();
}
