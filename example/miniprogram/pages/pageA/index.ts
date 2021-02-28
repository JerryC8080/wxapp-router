Page({
  data: {
    pageName: 'page A'
  },
  onLoad(query) {
    this.setData({query: JSON.stringify(query)})
  }
})
