import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'dfm-button-group-item',
  templateUrl: './button-group-item.component.html',
  styleUrls: ['./button-group-item.component.scss'],
})
export class ButtonGroupItemComponent {
  @Input() public disabled: boolean = false;

  @Input() public icon: string = '';

  @Input() public current: boolean = false;

  @ViewChild('buttonContent') buttonContent: any | null = null;
}
