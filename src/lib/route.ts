import navigator from './navigator';

export class Route {
  private routeUrl: string;

  constructor({ routeUrl }) {
    this.routeUrl = routeUrl;
  }

  public go(query) {
    return navigator.gotoPage(this.routeUrl, query);
  }

  public navigateTo(query) {
    return navigator.navigateTo(this.routeUrl, query);
  }

  public redirectTo(query) {
    return navigator.redirectTo(this.routeUrl, query);
  }

  public switchTab(query) {
    return navigator.switchTab(this.routeUrl, query);
  }
}

export default Route;
