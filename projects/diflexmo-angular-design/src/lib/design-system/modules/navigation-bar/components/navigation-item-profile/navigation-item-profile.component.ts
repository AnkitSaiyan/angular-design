import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { NavigationProfileData } from '../../models/navigation-profile-data';

@Component({
  selector: 'dfm-navigation-item-profile',
  templateUrl: './navigation-item-profile.component.html',
  styleUrls: ['./navigation-item-profile.component.scss', '../navigation-item/navigation-item.component.scss'],
})
export class NavigationItemProfileComponent implements AfterViewInit, OnDestroy {
  @Input() public profileData?: NavigationProfileData;

  @Input() public isSettingsButtonShown: boolean = true;

  @Output() public logout = new EventEmitter();

  @ViewChild('dropdown', { read: ElementRef }) dropdown?: ElementRef;

  public isDropdownOpened: boolean = false;

  ngAfterViewInit(): void {
    this.dropdown?.nativeElement.addEventListener('shown.bs.dropdown', this.markDropdownAsOpened.bind(this));
    this.dropdown?.nativeElement.addEventListener('hidden.bs.dropdown', this.markDropdownAsClosed.bind(this));
  }

  ngOnDestroy(): void {
    this.dropdown?.nativeElement.removeEventListener('shown.bs.dropdown', this.markDropdownAsOpened);
    this.dropdown?.nativeElement.removeEventListener('hidden.bs.dropdown', this.markDropdownAsClosed);
  }

  private markDropdownAsOpened() {
    this.isDropdownOpened = true;
  }

  private markDropdownAsClosed() {
    this.isDropdownOpened = false;
  }
}
