import { NavigationProfileLink } from './navigation-profile-link';
import { NavigationUser } from './navigation-user';

export class NavigationProfileData {
  constructor(public user: NavigationUser, public links: NavigationProfileLink[]) {}
}
