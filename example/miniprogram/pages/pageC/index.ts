Page({
  data: {
    pageName: 'page C',
    backSetData: { calledFrom: 'pageC' },
  },
  onLoad(query: any) {
    this.setData({query: JSON.stringify(query)})
  }
})
