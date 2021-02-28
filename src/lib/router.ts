import logger from './logger';
import navigator, { CommonParams } from './navigator';
import Route from './route';
import RouteMatcher from './route-matcher';
import { setter } from './utils';

export interface RegisterOption {
  route: string;
  path?: string;
}

export class Router {
  private routes: Record<string, unknown> = {};
  private routeMatchers: Array<RouteMatcher> = [];

  public register(option: RegisterOption) {
    const tiers = option.route
      .replace(/^\//, '')
      .replace(/$\//, '')
      .split('/')
      .slice(0, -1)
      .join('.');

    setter(this.routes, tiers, new Route({ routeUrl: option.route }));
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
      params: matchResult[0]?.params || {}
    }
  }

  public gotoPage(pathOrRoute: CommonParams['path'], query: CommonParams['query']) {
    const { path, params } = this.matchRoute(pathOrRoute);
    navigator.gotoPage(path, Object.assign({}, params, query));
  }

  public navigateTo(pathOrRoute: CommonParams['path'], query: CommonParams['query']) {
    const { path, params } = this.matchRoute(pathOrRoute);
    navigator.navigateTo(path, Object.assign({}, params, query));
  }

  public switchTab(pathOrRoute: CommonParams['path'], query: CommonParams['query']) {
    const { path, params } = this.matchRoute(pathOrRoute);
    navigator.switchTab(path, Object.assign({}, params, query));
  }

  public redirectTo(pathOrRoute: CommonParams['path'], query: CommonParams['query']) {
    const { path, params } = this.matchRoute(pathOrRoute);
    navigator.redirectTo(path, Object.assign({}, params, query));
  }

  public navigateBack(
    query: WechatMiniprogram.NavigateBackOption,
    option?: { setData: Record<string, unknown> }
    ) {
    navigator.navigateBack(query, option);
  }
}

export default Router;
