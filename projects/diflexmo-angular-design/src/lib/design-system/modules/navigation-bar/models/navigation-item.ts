export class NavigationItem {
  constructor(
    public title: string,
    public icon: string,
    public routerLink?: string,
    public exact: boolean = false,
    public isHiddenForMobile: boolean = false,
    public children: NavigationItem[] = [],
  ) {}
}
