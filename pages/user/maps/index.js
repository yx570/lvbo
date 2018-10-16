let point = [];
let that2;

let lineArr = [
    { latitude: 22.647967, longitude: 114.041586 },
    { latitude: 22.657967, longitude: 114.042086 },
    { latitude: 22.667967, longitude: 114.032286 },
    { latitude: 22.677967, longitude: 114.052586 }
];

function drawline() {
    that2.setData({
        polyline: [{
            points: lineArr,
            color: '#5298fe',
            width: 4,
            dottedLine: false
        }]
    });
}

//获取经纬度
function getlocation() {
    let lat, lng;
    wx.getLocation({
        type: 'gcj02',
        success: function (res) {
            lat = res.latitude;
            lng = res.longitude;
            point.push({ latitude: lat, longitude: lng });
            console.log(point);
        }
    });
}

Page({
    data: {
        polyline: [],
    },

    onLoad() {
        that2 = this;

        this.mapCtx = wx.createMapContext('map'); // map为地图的id

        this.myLocation();

        //getlocation();
        //point = lineArr;
        drawline();

        //this.tcPosition();
    },
    myLocation() {
        let _this = this;
        wx.getLocation({
            type: 'gcj02',
            success(res) {
                that2.setData({
                    longitude: res.longitude,
                    latitude: res.latitude,
                });
                let my = { latitude: res.latitude, longitude: res.longitude };
                _this.includePointsFn(my);

                let test = [{
                    ...lineArr[0],
                    // iconPath: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3461353247,2202984778&fm=26&gp=0.jpg",
                    iconPath: "/static/images/demo/markers.jpg",
                    width: 30,
                    height: 30
                }];

                that2.setData({
                    markers: test
                });
            }
        });
    },
    includePointsFn(my) {
        let mapPoints = [...lineArr, my];
        // 缩放视野展示所有经纬度(小程序API提供)
        this.mapCtx.includePoints({
            padding: [80, 50, 80, 50],
            points: mapPoints
        })
    }
});