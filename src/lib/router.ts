import logger from './logger';
import navigator from './navigator';
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

  public gotoPage(pathOrRoute, query) {
    const matchResult = this.routeMatchers
      .map((routeMatcher) => routeMatcher.match(pathOrRoute))
      .filter((result) => !!result);

    logger.debug('route match result:', { matchResult, pathOrRoute });

    // 优先使用第一个匹配
    const route = matchResult[0];
    if (matchResult[0])
      return navigator.gotoPage(
        route.route,
        Object.assign({}, route.query, query)
      );

    // 否则，尝试直接跳转
    return navigator.gotoPage(pathOrRoute, query);
  }
}

export default Router;
