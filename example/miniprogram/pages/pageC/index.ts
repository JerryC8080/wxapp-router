Page({
  data: {
    pageName: 'page C'
  },
  onLoad(query) {
    this.setData({query: JSON.stringify(query)})
  }
})
