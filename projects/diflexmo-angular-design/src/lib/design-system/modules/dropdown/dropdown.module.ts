import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownButtonComponent } from './components/dropdown-button/dropdown-button.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    DropdownButtonComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule
  ],
  exports: [
    DropdownButtonComponent
  ]
})
export class NgDfmDropdownModule { }
