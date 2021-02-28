Page({
  data: {
    pageName: 'page B'
  },
  onLoad(query) {
    this.setData({query: JSON.stringify(query)})
  }
})
