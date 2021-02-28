Page({
  data: {
    pageName: 'page A',
    backSetData: { calledFrom: 'pageA' },
  },
  onLoad(query: any) {
    this.setData({query: JSON.stringify(query)})
  }
})
