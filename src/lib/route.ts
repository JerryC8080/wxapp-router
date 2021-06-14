import navigator, { CommonParams } from './navigator';

export class Route<QueryType> {
  private routeUrl: string | CommonParams['path'];

  constructor({ routeUrl }) {
    this.routeUrl = routeUrl;
  }

  public go(query: QueryType) {
    return navigator.gotoPage(this.routeUrl, query);
  }

  public navigateTo(query: QueryType) {
    return navigator.navigateTo(this.routeUrl, query);
  }

  public redirectTo(query: QueryType) {
    return navigator.redirectTo(this.routeUrl, query);
  }

  public switchTab(query: QueryType) {
    return navigator.switchTab(this.routeUrl, query);
  }
}

export default Route;
