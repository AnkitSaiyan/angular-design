import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dfm-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss']
})
export class DropdownButtonComponent implements OnInit {

  useEllipsis: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
