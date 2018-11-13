const productModel = require('../../../models/product/index.js');
const cartModel = require('../../../models/cart/index.js');
const orderModel = require('../../../models/order/index.js');
const wxParse = require('../../../wxParse/wxParse.js');
const { img } = require('../../../config/url.js');
const app = getApp();

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
        cartList: {},
        cartNums: 0
    },
    onLoad(ev) {
        this.setData({
            id: ev.id
        })
        let id = this.data.id;
        this.getProductDetail(id);
        this.getOneComment(id);
        this.getCartList();
    },
    getCartList() {
        let _that = this;
        wx.getStorage({
            key: 'nb_cart',
            success(res) {
                let objKeys = Object.keys(res.data).length;
                _that.setData({
                    cartList: res.data,
                    cartNums: objKeys
                })
            }
        })
    },
    // 获取产品详情
    getProductDetail(id) {
        productModel.view({ product_id: id }).then(response => {
            let data = response.dataList.productInfo;
            let defaultCombo = data.skuList[0];
            this.splitPrice(defaultCombo.sku_price)

            let imgList = data.product_template_image;
            imgList.forEach((v, i) => {
                v = img + v || '';
                imgList[i] = v;
            });
            this.setData({
                obj: data,
                imgList: imgList,
                defaultCombo: defaultCombo
            })
            wxParse.wxParse('content', 'html', data.product_page_html, this, 12);
            wxParse.wxParse('buyNotice', 'html', data.product_note_to_buy, this, 12);
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
        let defaultCombo = this.data.obj.skuList[index];
        this.splitPrice(defaultCombo.sku_price)
        this.setData({
            selectIndex: index,
            defaultCombo: defaultCombo
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
    shopping(ev) {
        let _that = this;
        if (ev.detail.userInfo) {
            app.globalData.userInfo.user_wx_nick_name = ev.detail.userInfo.nickName;
            app.globalData.userInfo.user_wx_avatar_url = ev.detail.userInfo.avatarUrl;                // 用户微信头像地址
            app.globalData.userInfo.user_locate_province = ev.detail.userInfo.province;            // 微信 省
            app.globalData.userInfo.user_locate_city = ev.detail.userInfo.city;                    // 微信 市
            app.globalData.userInfo.user_locate_district = '';
            let userInfo = app.globalData.userInfo;
            let datas = this.data.obj;
            datas.defaultCombo = this.data.defaultCombo;
            datas.productName = datas.product_name;
            datas.imgUrl = datas.product_template_image[0];
            datas.quantity = this.data.times;
            datas.checked = 1;
            datas.price = this.data.defaultCombo.sku_price * this.data.times;
            app.globalData.goSettleList = [datas];

            if (!userInfo.user_locate_latitude || !userInfo.user_locate_longitude) {
                wx.showModal({
                    title: '温馨提示',
                    content: '请先填写服务地址',
                    showCancel: false,
                    confirmColor: '#00b0ab',
                    success() {
                        wx.navigateTo({
                            url: '../../user/address/index?from=proDetail&id=' + _that.data.id
                        })
                    }
                })
            } else {
                let p = {};
                let total = 0;
                let id = [];
                let skuName = [];
                let skuNums = [];
                app.globalData.goSettleList.forEach(v => {
                    id.push(v.id);
                    skuName.push(v.defaultCombo.sku_name);
                    skuNums.push(v.quantity);
                    total += parseFloat(v.price);
                });
                p.product_id = id.join(',');
                p.sku_name = skuName.join(',');
                p.sku_num = skuNums.join(',');
                p.order_amount = total;

                orderModel.add(p).then(res => {
                    let order = res.dataList.orderInfo;

                    app.removeItemFormCart();

                    // 提交订单
                    wx.navigateTo({
                        url: '../../../pages/order/buyNow/index?id=' + order.order_code
                    })
                });
            }
        }
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
        // 本地存储
        let obj = this.data.obj;
        let cartList = this.data.cartList;
        let defaultCombo = this.data.defaultCombo;
        if (cartList[obj.id + '_' + defaultCombo.sku_name]) {
            cartList[obj.id + '_' + defaultCombo.sku_name].quantity = cartList[obj.id + '_' + defaultCombo.sku_name].quantity + this.data.times;
        } else {
            let p = {};
            p.defaultCombo = defaultCombo;
            p.id = obj.id;
            p.productName = obj.product_name;
            p.imgUrl = obj.product_template_image[0];
            p.quantity = this.data.times;
            cartList[p.id + '_' + defaultCombo.sku_name] = p;
        }

        wx.setStorage({
            key: "nb_cart",
            data: cartList
        })

        // 存入数据库版
        // let p = {};
        // let defaultCombo = this.data.defaultCombo;
        // p.product_id = defaultCombo.product_id;
        // p.sku_name = defaultCombo.sku_name;
        // p.sku_num = this.data.times;

        // cartModel.additem(p).then(response => {
        //     console.log(response);
        // }).catch(e => {

        // });

        this.popClose();
        app.toastSuccess('添加成功');
        this.getCartList();
    },
    inputTap() { },
    // 改变商品数量
    changeCount(e) {
        this.setData({
            times: e.detail.value
        });
    },
})