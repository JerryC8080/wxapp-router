/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable functional/no-return-void */
/* eslint-disable @typescript-eslint/no-explicit-any */

import logger from './logger';
import navigator, { CommonParams } from './navigator';
import Router from './router';

export interface LandTransferOptions {
  // 如果指定了该方法，则识别: LAND_PAGE?scene=xxx 的方式
  convertSceneParams?: (sceneSp: string) => Promise<object>;

  // 跳转引擎，默认 navigator.gotoPage()
  gotoPage?: (
    path: CommonParams['path'],
    query: CommonParams['query']
  ) => Promise<any>;

  // Router 实例：设定之后，会使用 router.gotoPage 作为页面跳转引擎
  router?: Router;
}

export class LandTransfer {
  private convertSceneParams: LandTransferOptions['convertSceneParams'];
  private router: LandTransferOptions['router'];
  private gotoPage: LandTransferOptions['gotoPage'];

  constructor(params: LandTransferOptions = {}) {
    if (params.convertSceneParams)
      this.convertSceneParams = params.convertSceneParams;
    if (params.gotoPage) this.gotoPage = params.gotoPage;
    if (params.router) this.router = params.router;
  }

  /**
   * 跳转引擎
   * @param path
   * @param query
   */
  private doGotoPage(path, query) {
    if (this.gotoPage) return this.gotoPage(path, query);
    if (this.router) return this.router.gotoPage(path, query);
    return navigator.gotoPage(path, query);
  }

  /**
   * 启动，跳转到目标页面。
   * 参数优先级：scene > path
   * @param options.scene 短链参数，会用 this.convertSceneParams 解析成 object
   * @param options.path 目标路径，会跳转到目标页面去，例：'/pages/home/index'
   */
  public async run(options: Record<string, string | undefined>): Promise<any> {
    try {
      const { scene, ...rest } = options;
      const params = { query: { ...rest } };

      // 如存在 scene，启动短链解析
      if (scene) {
        if (!this.convertSceneParams) {
          logger.warn('缺少 convertSceneParams 函数，无法解析 scene =', scene);
        } else {
          params.query = Object.assign(
            {},
            params.query,
            await this.convertSceneParams(scene)
          );
        }
      }

      const { path, ...query } = params?.query;
      if (!path) throw new Error('path invalid');

      return this.doGotoPage(path, query);
    } catch (error) {
      logger.error('跳转失败', error);
      throw error;
    }
  }
}

export function landTransferDecorator(
  landTransferParams: LandTransferOptions
): any {
  return function transfer(
    _target: any,
    propertyName: string,
    descriptor: any
  ): void {
    if (propertyName !== 'onLoad') {
      throw new Error('landTransferDecorator only work on "onLoad"');
    }

    const landTransfer = new LandTransfer(landTransferParams);

    const originMethod = descriptor.value;

    descriptor.value = async function onLoad(options: any): Promise<any> {
      // 落地跳转
      try {
        await landTransfer.run(options);
      } catch (error) {
        logger.error(error);
      }

      // 调用原来的方法
      return originMethod.call(this, options);
    };
  };
}

export default LandTransfer;
