import { Component, Input } from '@angular/core';

@Component({
  selector: 'dfm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title: string = '';

  @Input() showHeader: boolean = true;

  @Input() collapseBody: boolean = false;

  @Input() iconName?: string;

  @Input() isDraggable: boolean = true;
}
