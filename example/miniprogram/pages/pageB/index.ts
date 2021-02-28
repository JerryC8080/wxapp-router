Page({
  data: {
    pageName: 'page B',
    backSetData: { calledFrom: 'pageB' },
  },
  onLoad(query: any) {
    this.setData({query: JSON.stringify(query)})
  }
})
