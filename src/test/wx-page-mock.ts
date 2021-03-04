export class Page {
  route: string;
  data = {};
  setData(data) {
    this.data = data;
  }
  constructor(route?) {
    this.route = route;
  }
}
