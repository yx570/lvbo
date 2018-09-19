const productModel = require('../../../models/product/index.js');
const wxParse = require('../../../wxParse/wxParse.js');
const app = getApp();
Page({
    data: {
        //图片地址
        imgList: [],
        orderId: '',
        obj: {},
        comment: {},
        num: 1,
        selectIndex: 0,
        minusStatus: 'disable',
        priceInt: 0,
        priceFloat: 0,
        content: '',
        buyNotice: ''
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
                imgList: response.data.imgList
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
        this.setData({
            selectIndex: ev.currentTarget.dataset.index
        })
    },
    // 以小数点分割价格
    splitPrice(price) {
        let [p1, p2] = price.split('.');
        this.setData({
            priceInt: p1 || 0,
            priceFloat: p2 || '00'
        })
    }
})