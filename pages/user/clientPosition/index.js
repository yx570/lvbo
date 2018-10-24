let point = [];
let that2;

let lineArr = [
    { latitude: 22.647967, longitude: 114.041586 }
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


                wx.getUserInfo({
                    success: function (res) {
                        console.log(res);
                        var avatarUrl = 'userInfo.avatarUrl';
                        var nickName = 'userInfo.nickName';
                        console.log(avatarUrl);
                        // that.setData({
                        //     [avatarUrl]: res.userInfo.avatarUrl,
                        //     [nickName]: res.userInfo.nickName,
                        // })
                    }
                })

                wx.downloadFile({
                    // url: "https://anteng-picture-oss.oss-cn-shenzhen.aliyuncs.com/osslvbang/20181017/9cddc7a1e59e423090eb4410bf38c05c.jpg",
                    url: "https://anteng-picture-oss.oss-cn-shenzhen.aliyuncs.com/osslvbang/20181017/9cddc7a1e59e423090eb4410bf38c05c.jpg?x-oss-process=image/resize,m_fill,h_100,w_100,image/circle,r_100/format,png",
                    success: (pathInfo) => {
                        // pathInfo.path 这是下载成的缓存链接，模拟器marker有时不支持http开头，真机不影响，得去掉http:/
                        let cachePath = pathInfo.tempFilePath.replace("http:/", '').replace("https:/", '')//真机中无需replace，都支持，

                        let test = [{
                            ...lineArr[0],
                            iconPath: '/static/images/markers.png',
                            width: 28,
                            height: 38,
                        }];

                        that2.setData({
                            markers: test,
                            testPath: cachePath
                        });
                    }
                })

                // let test = [{
                //     ...lineArr[0],
                //     // iconPath: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3461353247,2202984778&fm=26&gp=0.jpg",
                //     // iconPath: "/static/images/demo/markers.jpg",
                //     width: 30,
                //     height: 30,
                //     callout: {
                //         content: "test",
                //         borderRadius: 50,
                //         borderWidth:10,
                //         display: "ALWAYS"
                //     }
                // }];

                // that2.setData({
                //     markers: test
                // });
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