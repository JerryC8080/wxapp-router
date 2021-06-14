import logger from './logger';
import navigator, { CommonParams } from './navigator';
import Route from './route';
import RouteMatcher from './route-matcher';
import { setter } from './utils';

export interface RegisterOption {
  route: CommonParams['path'];
  path?: string;
}

export class Router {
  private routes = {};
  private routeMatchers: Array<RouteMatcher> = [];

  public register<QueryType>(option: RegisterOption) {
    const route =
      typeof option.route === 'string' ? option.route : option.route.path;
    const tiers = route
      .replace(/^\//, '')
      .replace(/$\//, '')
      .split('/')
      .slice(0, -1)
      .join('.');

    setter<Route<QueryType>>(
      this.routes,
      tiers,
      new Route<QueryType>({ routeUrl: option.route })
    );
    if (option.path)
      this.routeMatchers.push(new RouteMatcher(option.path, option.route));
  }

  public batchRegister(options) {
    options.forEach((option) => this.register(option));
  }

  public getRoutes() {
    return this.routes;
  }

  private matchRoute(pathOrRoute) {
    const matchResult = this.routeMatchers
      .map((routeMatcher) => routeMatcher.match(pathOrRoute))
      .filter((result) => !!result);

    logger.debug('route match result:', { matchResult, pathOrRoute });

    return {
      path: matchResult[0]?.route || pathOrRoute,
      params: matchResult[0]?.params || {},
    };
  }

  public gotoPage(
    pathOrRoute: CommonParams['path'],
    query: CommonParams['query']
  ) {
    const { path, params } = this.matchRoute(pathOrRoute);
    return navigator.gotoPage(path, Object.assign({}, params, query));
  }

  public navigateTo(
    pathOrRoute: CommonParams['path'],
    query: CommonParams['query']
  ) {
    const { path, params } = this.matchRoute(pathOrRoute);
    return navigator.navigateTo(path, Object.assign({}, params, query));
  }

  public switchTab(
    pathOrRoute: CommonParams['path'],
    query: CommonParams['query']
  ) {
    const { path, params } = this.matchRoute(pathOrRoute);
    return navigator.switchTab(path, Object.assign({}, params, query));
  }

  public redirectTo(
    pathOrRoute: CommonParams['path'],
    query: CommonParams['query']
  ) {
    const { path, params } = this.matchRoute(pathOrRoute);
    return navigator.redirectTo(path, Object.assign({}, params, query));
  }

  public navigateBack(
    query: { delta: number },
    option?: { setData: Record<string, unknown> }
  ) {
    return navigator.navigateBack(query, option);
  }
}

export default Router;
