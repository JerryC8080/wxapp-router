import Route from './route';
import { setter } from './utils';

export interface RegisterOption {
  route: string;
  path?: string;
}

export class Router {
  private routes: Record<string, unknown>;
  private virtualPathMap = new Map();

  public register(option: RegisterOption) {
    const tiers = option.route
      .replace(/^\//, '')
      .replace(/$\//, '')
      .split('/')
      .slice(0, -1)
      .join('.');

    setter(this.routes, tiers, new Route({ routeUrl: option.route }));
    if (option.path) this.virtualPathMap.set(option.path, option.route);
  }

  public batchRegister(options) {
    options.forEach((option) => this.register(option));
  }

  public getRoutes() {
    return this.routes;
  }

  public gotoPage(path, query) {
    // TODO 解析虚拟路径 path，转换成真实路由 route
    // TODO 调用 navigator.gotoPage(route, query);
  }
}

export default Router;
