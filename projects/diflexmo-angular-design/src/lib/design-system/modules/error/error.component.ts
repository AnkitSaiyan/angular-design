import { Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'dfm-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  @Input() control: NgControl | null = null;
}
