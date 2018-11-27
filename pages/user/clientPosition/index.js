let point = [];
let that2;

let app = getApp();
Page({
    ...app.loadMoreMethods,
    data: {
        clientPosition: ''
    },

    onLoad() {
        that2 = this;

        this.mapCtx = wx.createMapContext('map'); // map为地图的id

        this.myLocation();

        let data = app.globalData.clientPosition;
        this.setData({
            clientPosition: { latitude: data.customerInfo.user_locate_latitude, longitude: data.customerInfo.user_locate_longitude }
        })
    },
    myLocation() {
        let _that = this;
        wx.getLocation({
            type: 'gcj02',
            success(res) {
                that2.setData({
                    longitude: res.longitude,
                    latitude: res.latitude,
                });
                let my = { latitude: res.latitude, longitude: res.longitude };
                _that.includePointsFn(my);
            }
        });
    },
    includePointsFn(my) {
        // 添加客户标注   
        that2.setData({
            markers: [my]
        });

        let mapPoints = [ this.data.clientPosition, my ];
        // 缩放视野展示所有经纬度(小程序API提供)
        this.mapCtx.includePoints({
            padding: [80, 50, 80, 50],
            points: mapPoints
        })
    }
});