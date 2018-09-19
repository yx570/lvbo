const productModel = require('../../../models/product/index.js');
const wxParse = require('../../../wxParse/wxParse.js');

Page({
    data: {
        //图片地址
        imgList: [],
        orderId: '',
        obj: {},
        comment: {},
        num: 1,
        selectIndex: 0,
        defaultCombo: {},
        minusStatus: 'disable',
        priceInt: 0,
        priceFloat: 0,
        content: '',
        buyNotice: '',
        popVisible: false,
    },
    onLoad(ev) {
        this.setData({
            id: ev.id
        })
        let id = this.data.id;
        this.getProductDetail(id);
        this.getOneComment(id);
    },
    // 获取产品详情
    getProductDetail(id) {
        productModel.view({ id }).then(response => {
            this.splitPrice(response.data.price)
            this.setData({
                obj: response.data,
                imgList: response.data.imgList,
                defaultCombo: response.data.mutliPriceLIst[0]
            })
            content: wxParse.wxParse('content', 'html', response.data.content, this, 12);
            buyNotice: wxParse.wxParse('buyNotice', 'html', response.data.buyNotice, this, 12);
        }).catch(e => {});
    },
    // 获取一条评论
    getOneComment(id) {
        productModel.oneComment({ id }).then(response => {
            this.setData({
                comment: response.data
            })
        }).catch(e => {});
    },
    // 更改价格套餐
    priceChange(ev) {
        let index = ev.currentTarget.dataset.index
        this.setData({
            selectIndex: index,
            defaultCombo: this.data.obj.mutliPriceLIst[index]
        })
    },
    // 以小数点分割价格
    splitPrice(price) {
        let [p1, p2] = price.split('.');
        this.setData({
            priceInt: p1 || 0,
            priceFloat: p2 || '00'
        })
    },
    // 首页
     home() {
       wx.switchTab({
         url: '../../tabBar/home/index',
       })
    }, 
    // 购物车
     shoppingCart() {
       wx.switchTab({
         url: '../../tabBar/cart/index',
       })
    }, 
    //弹窗
    selectTap(ev) {
      this.setData({
        popVisible: true
      });
    },
    popClose(ev) {
      this.setData({
        popVisible: false
      });
    }
})