import logger from './logger';
import { obj2Params } from './utils';

interface CommonParams {
  path: string | { path: string; type: PathType };
  query?: Record<string, unknown>;
}

const paramsParsing = (commonParams: CommonParams) => {
  const { path, query } = commonParams;
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
  public gotoPage(...arg: [CommonParams['path'], CommonParams['query']]) {
    const [path, query] = arg;
    logger.debug('call gotoPage', { path, query });
    const { routerPath } = paramsParsing({ path, query });

    if (!routerPath)
      return logger.log('gotoPage:fail', `页面路径不存在 ${path}`);

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

  public navigateTo(path: CommonParams['path'], query: CommonParams['query']) {
    if (!this.isClick) return;
    this.isClick = false;

    const { toUrl } = paramsParsing({ path, query });

    wx.navigateTo({
      url: toUrl,
      success: () => {
        logger.log('navigateTo:success', 'navigateTo成功', { toUrl });
      },
      fail: (...arg) => {
        logger.log('navigateTo:fail', 'navigateTo失败', arg);
      },
      complete: () => {
        this.isClick = true;
      },
    });
  }

  public switchTab(path: CommonParams['path'], query: CommonParams['query']) {
    if (!this.isClick) return;
    this.isClick = false;

    const { toUrl } = paramsParsing({ path, query });

    wx.switchTab({
      url: toUrl,
      success: () => {
        logger.log('switchTab:success', 'switchTab成功', { toUrl });
      },
      fail: (...arg) => {
        logger.log('switchTab:fail', 'switchTab失败', arg);
      },
      complete: () => {
        this.isClick = true;
      },
    });
  }

  public redirectTo(path: CommonParams['path'], query: CommonParams['query']) {
    if (!this.isClick) return;
    this.isClick = false;

    const { toUrl } = paramsParsing({ path, query });

    wx.redirectTo({
      url: toUrl,
      success: () => {
        logger.log('redirectTo:success', 'redirectTo成功', { toUrl });
      },
      fail: (...arg) => {
        logger.log('redirectTo:fail', 'redirectTo失败', arg);
      },
      complete: () => {
        this.isClick = true;
      },
    });
  }

  public navigateBack(
    query: WechatMiniprogram.NavigateBackOption,
    option?: { setData: Record<string, unknown> }
  ) {
    if (!this.isClick) return;
    this.isClick = false;

    if (option?.setData) {
      const pageStack = getCurrentPages();
      const backPage = pageStack[pageStack.length - 1 - (query.delta || 1)];
      backPage?.setData(option?.setData);
    }

    wx.navigateBack({
      delta: query.delta,
      success: (...arg) => query?.success?.(...arg),
      fail: (...arg) => {
        logger.log('navigateBack:fail', 'navigateBack失败', arg);
        query?.fail?.(...arg);
      },
      complete: (...arg) => {
        this.isClick = true;
        query?.complete?.(...arg);
      },
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
}

export const navigator = new Navigator();

export default navigator;
