import { AfterContentInit, AfterViewInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'dfm-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements AfterViewInit, AfterContentInit {
  @Input() content?: HTMLDivElement;

  @ContentChild('navigationItems') navigationItems!: TemplateRef<any>;

  @ContentChild('moreNavigationItems') moreNavigationItems?: TemplateRef<any>;

  @ContentChild('profileItems') profileItems!: TemplateRef<any>;

  public isCollapsed: boolean = false;

  public isMoreItemsSectionShown: boolean = true;

  public isMoreItemSelected: boolean = true;

  ngAfterContentInit(): void {
    const isMoreItemSelected = !!document.querySelectorAll('.more-navigation-items .dfm-navigation-item-selected').length;
    this.updateMoreItemsSection(isMoreItemSelected);
  }

  ngAfterViewInit(): void {
    if (this.content) {
      this.content.onscroll = (e: Event) => (this.isCollapsed = (e.target as HTMLElement).scrollTop > 64);
    }
  }

  updateMoreItemsSection(isMoreItemSelected: boolean) {
    if (!this.moreNavigationItems) {
      return;
    }

    this.isMoreItemSelected = isMoreItemSelected;
    this.isMoreItemsSectionShown = false;
  }
}
