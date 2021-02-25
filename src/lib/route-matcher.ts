import { pathToRegexp } from 'path-to-regexp';

export default class RouteMatcher {
  private keys = [];

  // 匹配正则
  public regex = null;

  // 真实路径
  public route = null;

  constructor(path, route) {
    this.regex = pathToRegexp(path, this.keys);
    this.route = route;
  }

  match(path: string) {
    const result = path.match(this.regex);
    if (!result) return undefined;

    const route = this.route;
    const query = {};

    // 若存在路由参数，解释
    if (this.keys[0]) {
      this.keys.forEach((key, index) => {
        query[key.name] = result[index + 1];
      });
    }

    return {
      route,
      query,
    };
  }
}
