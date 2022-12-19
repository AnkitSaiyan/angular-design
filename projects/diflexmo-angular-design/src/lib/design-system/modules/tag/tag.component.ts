import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagAction } from './types/tag-action.type';
import { TagColor } from './types/tag-color.type';
import { TagSize } from './types/tag-size.type';

@Component({
  selector: 'dfm-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  @Input() public color: TagColor = 'default';

  @Input() public size: TagSize = 'md';

  @Input() public action: TagAction | null = null;

  @Input() public count: number | null = null;

  @Input() public icon: string = '';

  @Output() public closeAction = new EventEmitter();

  public clickCloseAction(): void {
    this.closeAction.emit();
  }
}
