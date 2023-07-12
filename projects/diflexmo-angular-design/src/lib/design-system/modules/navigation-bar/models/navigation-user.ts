export class NavigationUser {
  constructor(public name: string, public email: string, public avatar?: string, public link?: string, public isLinkExternal: boolean = false) {}
}
