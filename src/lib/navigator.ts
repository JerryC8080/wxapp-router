import logger from './logger';
import { obj2Params } from './utils';

export interface CommonParams {
  path: string | { path: string; type: PathType };
  query?: any;
}

const paramsParsing = (commonParams: CommonParams) => {
  const { path, query = {} } = commonParams;
  const routerPath =
    typeof path === 'string' ? { path, type: PathType.NORMAL } : path;

  const urlQuery = obj2Params(query);
  const urlQueryStr = urlQuery ? `?${urlQuery}` : '';
  const toUrl = `${routerPath.path}${urlQueryStr}`;

  return {
    routerPath,
    toUrl,
  };
};

export enum PathType {
  // 普通页面
  NORMAL = 'normal',
  // 微信小程序原生tabBar页面
  TAB = 'tab',
}

export class Navigator {
  // 锁
  private isClick = true;

  // 页面栈最大深度
  private maxDeep = 10;

  // 智能跳转应用内某页面
  public async gotoPage(...arg: [CommonParams['path'], CommonParams['query']]) {
    const [path, query = {}] = arg;
    logger.debug('call gotoPage', { path, query });
    const { routerPath } = paramsParsing({ path, query });

    // 页面为tab页面
    if (routerPath.type === PathType.TAB) {
      return this.switchTab(...arg);
    }

    // 页面栈已达上限
    const pageStack = getCurrentPages();
    const pageStackLength = pageStack.length;
    const curDelta = this.findPageInHistory(routerPath.path);
    if (pageStack.length >= this.maxDeep) {
      // 当前页面：在页面栈中
      if (curDelta > -1)
        return this.navigateBack({ delta: pageStackLength - curDelta });

      // 当前页面：不在页面栈中
      return this.redirectTo(...arg);
    }

    return this.navigateTo(...arg);
  }

  /**
   * navigateTo
   * @param path 小程序页面真实路径
   * @param query 页面参数
   * @param options.events 页面间通信接口，用于监听被打开页面发送到当前页面的数据。
   */
  public async navigateTo(
    path: CommonParams['path'],
    query?: CommonParams['query'],
    options?: { events: any }
  ): Promise<any> {
    this.checkIsClick();
    this.isClick = false;

    const { toUrl } = paramsParsing({ path, query });

    return new Promise((resolve, reject) => {
      wx.navigateTo({
        url: toUrl,
        events: options?.events,
        success: (arg) => {
          logger.log('navigateTo:success', 'navigateTo成功', { toUrl });
          resolve(arg);
          this.isClick = true;
        },
        fail: (arg) => {
          logger.log('navigateTo:fail', 'navigateTo失败', arg);
          reject(arg);
          this.isClick = true;
        },
      });
    });
  }

  /**
   * switchTab
   * @param path 小程序页面真实路径
   * @param query 页面参数
   */
  public async switchTab(
    path: CommonParams['path'],
    query: CommonParams['query'] = {}
  ) {
    this.checkIsClick();
    this.isClick = false;

    const { toUrl } = paramsParsing({ path, query });

    return new Promise((resolve, reject) => {
      wx.switchTab({
        url: toUrl,
        success: (arg) => {
          logger.log('switchTab:success', 'switchTab成功', { toUrl });
          resolve(arg);
          this.isClick = true;
        },
        fail: (arg) => {
          logger.log('switchTab:fail', 'switchTab失败', arg);
          reject(arg);
          this.isClick = true;
        },
      });
    });
  }

  /**
   * redirectTo
   * @param path 小程序页面真实路径
   * @param query 页面参数
   */
  public async redirectTo(
    path: CommonParams['path'],
    query: CommonParams['query'] = {}
  ) {
    this.checkIsClick();
    this.isClick = false;

    const { toUrl } = paramsParsing({ path, query });

    return new Promise((resolve, reject) => {
      wx.redirectTo({
        url: toUrl,
        success: (arg) => {
          logger.log('redirectTo:success', 'redirectTo成功', { toUrl });
          resolve(arg);
          this.isClick = true;
        },
        fail: (arg) => {
          logger.log('redirectTo:fail', 'redirectTo失败', arg);
          reject(arg);
          this.isClick = true;
        },
      });
    });
  }

  /**
   * navigateBack
   * @param query.delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
   * @param option.setData 植入目标页面 data 的数据。
   */
  public async navigateBack(
    query: { delta: number },
    option?: { setData: Record<string, unknown> }
  ) {
    this.checkIsClick();
    this.isClick = false;

    if (option?.setData) {
      const pageStack = getCurrentPages();
      const backPage = pageStack[pageStack.length - 1 - (query.delta || 1)];
      backPage?.setData(option?.setData);
    }

    return new Promise((resolve, reject) => {
      wx.navigateBack({
        delta: query.delta,
        success: (arg) => {
          resolve(arg);
          this.isClick = true;
        },
        fail: (arg) => {
          logger.log('navigateBack:fail', 'navigateBack失败', arg);
          reject(arg);
          this.isClick = true;
        },
      });
    });
  }

  private findPageInHistory(path: string): number {
    const pageStack = getCurrentPages();
    const reg = /^\//;

    let delta = -1;

    // eslint-disable-next-line functional/no-loop-statement
    for (let i = 0; i < pageStack.length; i++) {
      const myRoute = pageStack[i].route;
      if (
        myRoute &&
        path &&
        myRoute.replace(reg, '') === path.replace(reg, '')
      ) {
        delta = i + 1; // 目标页在栈中的位置
        break;
      }
    }

    return delta;
  }

  private checkIsClick() {
    if (this.isClick === false) throw new Error('req locked');
  }
}

export const navigator = new Navigator();

export default navigator;
