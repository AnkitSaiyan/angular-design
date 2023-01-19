import { AfterViewInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'dfm-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements AfterViewInit {
  @Input() content?: HTMLDivElement;

  @ContentChild('navigationItems') navigationItems!: TemplateRef<any>;

  @ContentChild('profileItems') profileItems!: TemplateRef<any>;

  public isCollapsed: boolean = false;

  ngAfterViewInit(): void {
    if (this.content) {
      this.content.onscroll = (e: Event) => (this.isCollapsed = (e.target as HTMLElement).scrollTop > 64);
    }
  }
}
