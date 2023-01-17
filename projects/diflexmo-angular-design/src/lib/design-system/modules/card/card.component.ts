import { Component, Input } from '@angular/core';

@Component({
  selector: 'dfm-card',
  template: `
    <div class="dfm-card">
      <div class="dfm-card-header" *ngIf="showHeader">
        <div class="dfm-card-title d-flex dfm-gap-8">
          <div class="dfm-card-icon" [ngClass]="{'drag-handler pointer': isDraggable}"]>
            <ng-container *ngIf="isDraggable">
              <dfm-icon name="drag"></dfm-icon>
            </ng-container>
            <ng-container *ngIf="iconName && !isDraggable">
              <dfm-icon [name]="iconName"></dfm-icon>
            </ng-container>
          </div>
          <ng-container *ngIf="title; else contentTitle">
            {{ title }}
          </ng-container>
        </div>
        <div class="dfm-card-toolbar">
          <ng-content select="[toolbar]"></ng-content>
        </div>
      </div>

      <div *ngIf="!collapseBody" class="dfm-card-body-no-gutter">
        <ng-content></ng-content>
      </div>
    </div>

    <ng-template #contentTitle>
      <ng-content select="[title]"></ng-content>
    </ng-template>
  `,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title: string = '';

  @Input() showHeader: boolean = true;

  @Input() collapseBody: boolean = false;

  @Input() iconName?: string;

  @Input() isDraggable: boolean = true;
}
