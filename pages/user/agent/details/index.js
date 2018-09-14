const manageModel = require("../../../../models/manage/index.js");
Page({
  data:{
    infos: {
      goodsCode: "",//商品编码
      goodsName: "",//商品名称 
      jinguName: ""
    },
    labelFormat:{
      goodsCode: "订单编号",
      id: "订单编号",
      goodsName: "商品名称 ",
      skuContent: "商品规格",
      skuName: "商品规格",
      goodsQuantity: "代理数量",
      deliverQuantity: "提货数量",
      agentQuantity: "代理数量",
      hasDeliveredQuantity: "已提货数量",
      buybackQuantity: "回购数量",
      verifyQuantity: "已核销数量",
      returnQuantity: "需退数量",
      hasBuybackedQuantity: "已回购数量",
      goodsSalePriceCent: "市场价格",
      salePriceCent: "市场价格",
      priceCent: "代理价格",		
      buybackAmountCent: "回购金额",		
      cellPhone: "联系电话",
      phoneNumber: "联系电话",
      userName: "姓名",
      realName: "姓名",
      jinguName: "区域",
      amountCent: "订单金额",	
      createTime: "提交时间",
      deliverTime: "提货时间",
      orderStatus: "订单状态",
      auditRemark: "审核备注",
      deliverType: "配送方式",
      deliverType1: "配送方式",
      receiveName: "收货人",
      receivePhoneNumber: "收货人手机",
      receiveAddress: "收货人地址"
    },
    titles:{
      1:'代理记录',
      2:'提货审核',
      3:'回购审核',
      4:'提货记录',
      5:'回购记录',
      6:'核销记录'
    }
  },
  onLoad: function (options) {
    let { key = 1, id } = options || {};
    // this.setData({
    //   key
    // });
    wx.setNavigationBarTitle({
      title: this.data.titles[key]
    }); 
    this.getDetails(Number(key), id);
  },
  getDetails(key, id){
    let request = [
      manageModel.getBusinessOrderDetail,
      manageModel.getDeliverDetail,
      manageModel.getBuybackDetail,
      manageModel.getDeliverDetail,
      manageModel.getBuybackDetail,
      manageModel.getVerifyPage
    ][key - 1];
    request({ id }).then(response=>{
      let { 
        goodsCode = "",
        id = "",
        goodsName = "",
        goodsQuantity = 0,
        goodsSalePriceCent = 0,
        salePriceCent = 0,
        skuContent = "",
        priceCent = 0,
        jinguName = "",
        userName = "",
        cellPhone = "",
        amountCent = 0 ,
        createTime = "",
        orderStatus =  "",

        skuName = "",
        realName = "",
        phoneNumber = "",
        deliverTime = "",
        deliverType = 1,
        deliverQuantity = 0,
        receiveName = "",
        receivePhoneNumber = "",
        receiveAddress = "", 
        agentQuantity = 0,
        hasDeliveredQuantity = 0,

        buybackAmountCent = 0,
        buybackQuantity = 0,
        returnQuantity = 0,
        verifyQuantity = 0,
        hasBuybackedQuantity = 0,
        auditRemark =  ""
      } = response.data;
      let infos = {};
      
      switch (key){
        case 1:
          infos = {
            id,
            goodsName,
            skuContent,
            goodsQuantity,
            salePriceCent,
            priceCent,
            amountCent,
            orderStatus,
          }
          break;
        case 2:
          infos = {
            goodsName,
            realName,
            phoneNumber,
            skuContent,
            deliverQuantity,
            receivePhoneNumber,
            receiveAddress,
            jinguName,
            auditRemark,
          }
          break;
        case 3: 
          infos = {
            realName,
            phoneNumber,
            goodsName,
            id,
            skuContent,
            jinguName,
            createTime,
            agentQuantity,
            verifyQuantity,
            hasBuybackedQuantity,
            buybackQuantity,
            buybackAmountCent,
            returnQuantity,
            auditRemark
          }
          break;
        case 6:
          infos = {
            id,
            goodsName,
            skuContent,
            goodsQuantity,
            goodsSalePriceCent,
            priceCent,
            userName,
            cellPhone,
            jinguName,
            amountCent,
            createTime,
            orderStatus
          }
          break;
        case 4:
          var deliverType1 = deliverType.key;
          infos = {
            id,
            goodsName,
            skuContent,
            jinguName,
            realName,
            phoneNumber,
            deliverTime,
            deliverType1,
            realName,
            phoneNumber,
            jinguName,
            agentQuantity,
            deliverQuantity,
            hasDeliveredQuantity,
            auditRemark
          }
          break;
        case 5:
          infos = {
            id,
            goodsName,
            skuContent,
            jinguName,
            realName,
            phoneNumber,
            buybackAmountCent,
            agentQuantity,
            verifyQuantity,
            hasBuybackedQuantity,
            buybackQuantity,
            returnQuantity,
            createTime,
            auditRemark
          }
          break;
      }
      this.setData({
        infos
      });
    }).catch(e=>{});
  }
})