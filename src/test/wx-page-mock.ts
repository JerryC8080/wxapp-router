export class Page {
  route: string;
  onLoad: (options) => any;
  data = {};
  setData(data) {
    this.data = data;
  }
  constructor({ route, onLoad }: any = {}) {
    if (route) this.route = route;
    if (onLoad) this.onLoad = onLoad;
  }
}
