import { Component, Input } from '@angular/core';

@Component({
  selector: 'dfm-card',
  template: `
    <div class="dfm-card">
      <div class="dfm-card-header">
        <div class="dfm-card-title d-flex dfm-gap-8">
          <div class="dfm-card-icon drag-handler">
            <dfm-icon name="drag"></dfm-icon>
          </div>
          {{ title }}
        </div>
        <div>
          <ng-content select="[toolbar]"></ng-content>
        </div>
      </div>

      <div class="dfm-card-body-no-gutter">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title: string = '';
}
