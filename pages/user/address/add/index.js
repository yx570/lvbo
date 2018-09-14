let app = getApp();
const { absolutePath } = require('../../../../utils/path.js');
const addressModel = require('../../../../models/user/address/index.js');
const commonModel = require('../../../../models/common/index.js');
Page({
  data:{
    form: {
      name: '',
      mobile: '',
      regionId: '',
      code: '',
      address: '',
      isDefault: false
    },
    labelFormat: {
      name: '收件人姓名',
      mobile: '手机号码',
      regionId: '所在地址',
      code: '邮政编码',
      address: '详细地址',
      isDefault: '设为默认地址'
    },
    operateType:1,
    rowId:0,
    areaName:'',
    provinces:[],
    cities:[],
    areas:[],
    pickerValues:[0, 0, 0],
    popVisible:false
  },
  onLoad: function (options) {
    let indexPage = app.pages.get('pages/user/address/index/index') || {};
    let { type = 1 } = options;
    this.setData({
      operateType: type
    });
    if (type == 2){
      wx.setNavigationBarTitle({
        title: "修改收货地址"
      }); 
      let { currentRow = {} } = indexPage.data;
      console.log(currentRow);
      this.setData({
        form:{
          name: currentRow.consignee,
          mobile: currentRow.phone,
          regionId: currentRow.regionId,
          code: currentRow.zipCode,
          address: currentRow.address,
          isDefault: currentRow.default
        },
        areaName: currentRow.areaName,
        rowId: currentRow.id
      });
    }
  },
  getProvinces(){
    commonModel.getRegionProvince().then(response=>{
      let data = response.data || [];
      let current = data[0];
      this.setData({
        provinces: data
      });
      !!current && this.getCities(current.value);
    }).catch(e=>{});
  },
  getCities(regionId){
    commonModel.getRegionSubs({ regionId }).then(response => {
      let data = response.data || [];
      let current = data[0];
      this.setData({
        cities: data
      });
      !!current && this.getAreas(current.value);
    }).catch(e => {});
  },
  getAreas(regionId) {
    commonModel.getRegionSubs({ regionId }).then(response => {
      let data = response.data || [];
      let current = data[0] || {};
      this.setData({
        areas: data
      });
    }).catch(e => { });
  },
  itemTap(ev){
    let { key } = ev.currentTarget.dataset;
    if (key == 'regionId'){
      this.getProvinces();
      this.setData({
        popVisible: true
      });
    }
  },
  closePop(){
    this.setData({
      popVisible: false
    });
  },
  selectRegion(){
    this.setData({
      'form.regionId': this.data.areas[this.data.pickerValues[2]].value,
      popVisible: false
    });
  },
  formSubmit(ev){
    console.log(ev);
    let { name, mobile, code, address, isDefault } = ev.detail.value;
    let { regionId } = this.data.form;
    app.test.all([
      {
        type: 'string',
        label: '收件人姓名',
        value: name,
        min: 0
      },
      {
        type: 'mobile',
        label: '手机号码',
        value: mobile
      },
      {
        type: 'number',
        label: '所在地址',
        value: this.data.provinces.length
      },
      {
        type: 'string',
        label: '邮政编码',
        value: code,
        min: 0
      },
      {
        type: 'string',
        label: '详细地址',
        value: address,
        min: 0
      }
    ]).then(()=>{
      // 校验通过
      let params = {
        address,      
        consignee: name,   
        isDefault,     
        phone: mobile,    
        regionId,     
        zipCode: code 
      };
      this.data.operateType == 2 && (params.id = this.data.rowId);
      [addressModel.add, addressModel.update][this.data.operateType - 1](params).then(response=>{
        console.log(response);
        wx.navigateBack();
        wx.showToast({
          title: '操作成功！',
          icon: 'success',
          duration: 2000
        });
      }).catch(e=>{});
    }).catch(error=>{
      // 校验不通过
      wx.showToast({
        title: error.message,
        icon: 'none',
        duration: 2000
      });
    });
  },
  pickerChange(ev){
    let { value } = ev.detail;
    let v0 = value[0];
    let v1 = value[1];
    let v2 = value[2];
    if (this.data.pickerValues[0] !== v0){
      this.getCities(this.data.provinces[v0].value);
      this.setData({
        pickerValues: [v0,0 ,0]
      });
    }else{
      if (this.data.pickerValues[1] !== v1){
        this.getAreas(this.data.cities[v1].value);
        this.setData({
          pickerValues: [v0, v1, 0]
        });
      }else{
        this.setData({
          pickerValues: [v0, v1, v2]
        });
      }
    }
  }
})