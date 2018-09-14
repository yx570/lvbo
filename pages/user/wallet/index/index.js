
const walletModel = require('../../../../models/user/wallet/index.js');

Page({
  data:{
    balance:500,
    balanceShow:true,
    asset:{
      validBalance: 0,    // 可使用总金额 余额
      balance: 0,         // 总金额
      requestBalance: 0,  // 提现冻结
      bankCardCount: 0,   // 绑定银行卡数量
      isOpen: true
    },
    operates1:[
      {
        label:'充值',
        key:'recharge',
        icon:'icon-recharge'
      },
      {
        label:'提现',
        key:'withdraw',
        icon:'icon-withdraw'
      }
    ],
    operates2:[
      {
        label:'明细',
        key:'detail',
        icon:'icon-detail'
      },
      {
        label:'银行卡',
        key:'bankCardCount',
        icon:'icon-card'
      }
    ],
    assetFormat:{
      balance:'总资产(元)',
      requestBalance:'冻结金额(元)',
      bankCardCount:'银行卡'
    },
    navigates:{
      recharge:'../recharge/index',
      withdraw:'../withdraw/index',
      detail:'../details/index',
      bankCardCount:'../bankcard/index/index'
    }
  },
  // onLoad(){
  //   this.getDepositDatas();
  // },
  onShow() {
    this.getDepositDatas();
  },
  onPullDownRefresh(){
    this.getDepositDatas();
  },
  getDepositDatas(){
    walletModel.deposit().then(response => {
      this.setData({
        asset: response.data || {}
      });
      console.log(response.data)
      if (!response.data.isOpen){
        wx.showModal({
          title: '温馨提示',
          content: '您尚未开通钱包功能，请前往开通！',
          confirmColor: '#ff5100',
          success: res => {
            if (res.confirm) {
              wx.navigateTo({
                url: '../../account/trade/index'
              });
            } else if (res.cancel) {
              wx.navigateBack();
            }
          }
        });
      }
    }).catch(error => {});
  },
  toggleShow(){
    this.setData({
      balanceShow:!this.data.balanceShow
    });
  },
  viewDetails(){
    wx.navigateTo({
      url:'../details/index'
    });
  },
  checkoutNavigate(ev){
    let { key } = ev.currentTarget.dataset;
    if (key == 'withdraw' && this.data.asset.bankCardCount == 0){
      wx.showModal({
        title: '温馨提示',
        content: '您尚未绑定银行卡，请前往绑定！',
        confirmColor: '#ff5100',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '../bankcard/bind/index?type=2'
            });
          } else if (res.cancel) {
            // wx.navigateBack();
          }
        }
      });
    }else{
      this.data.navigates[key] && wx.navigateTo({
        url:this.data.navigates[key]
      });
    }
  }
})