const productModel = require('../../../models/product/index.js');
const cartModel = require('../../../models/cart/index.js');
const wxParse = require('../../../wxParse/wxParse.js');
const { img } = require('../../../config/url.js');

Page({
    data: {
        //图片地址
        imgList: [],
        orderId: '',
        obj: {},
        comment: {},
        times: 1,
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
        productModel.view({ product_id: id }).then(response => {
            let data = response.dataList.productInfo;
            this.splitPrice(data.skuList[0].sku_price)

            let imgList = data.product_template_image;
            imgList.forEach((v, i) => {
                v = img + v || '';
                imgList[i] = v;
            });
            this.setData({
                obj: data,
                imgList: imgList,
                defaultCombo: data.skuList[0]
            })
            content: wxParse.wxParse('content', 'html', data.product_page_html, this, 12);
            buyNotice: wxParse.wxParse('buyNotice', 'html', data.product_note_to_buy, this, 12);
        }).catch(e => { });
    },
    // 获取一条评论
    getOneComment(id) {
        productModel.oneComment({ id }).then(response => {
            this.setData({
                comment: response.data
            })
        }).catch(e => { });
    },
    // 更改价格套餐
    priceChange(ev) {
        let index = ev.currentTarget.dataset.index
        this.setData({
            selectIndex: index,
            defaultCombo: this.data.obj.skuList[index]
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
    // 立即购买
    shopping() {
        wx.navigateTo({
            url: '../../order/buyNow/index',
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
    },
    Cart() {
        let p = {};
        let defaultCombo = this.data.defaultCombo;
        p.product_id = defaultCombo.product_id;
        p.sku_name = defaultCombo.sku_name;
        p.sku_num = this.data.times;

        cartModel.additem(p).then(response => {
            console.log(response);
        }).catch(e => {

        });
        console.log(p);
    },
    inputTap() { },
    // 改变商品数量
    changeCount(e) {
        this.setData({
            times: e.detail.value
        });
    },
})