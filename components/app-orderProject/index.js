// components/app-orderProject/index.js
const util = require('../../utils/utils.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        h: '00',
        m: '00',
        s: '00',
        statusFormat: {
            1: "已服务",
            2: "技师已出发",
            5: "技师已到达",
            3: "服务中",
            4: "待服务"
        },
    },
    ready() {
        this.getServicesTime();
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getServicesTime() {
            let startTime
            let _this = this;
            this.data.list.forEach(function (value, index, arrSelf) {
                if (value.status == 3) {
                    startTime = value.startTime.replace(/-/g, '/');
                    let now = util.formatTime(new Date());
                    let oldTime = new Date(startTime).getTime() / 1000;
                    let newTime = new Date(now).getTime() / 1000;
                    let serviceTime = newTime - oldTime;

                    //计算相差小时数
                    let leave1 = serviceTime % (60 * 60)    //计算天数后剩余的毫秒数
                    let h = Math.floor(serviceTime / (60 * 60))
                    //计算相差分钟数
                    let leave2 = leave1 % (60 * 60)        //计算小时数后剩余的毫秒数
                    let m = Math.floor(leave2 / (60))
                    //计算相差秒数
                    let leave3 = leave2 % (60)      //计算分钟数后剩余的毫秒数
                    let s = Math.round(leave3)

                    _this.setData({
                        h: h.toString().padStart(2, '0'),
                        m: m.toString().padStart(2, '0'),
                        s: s.toString().padStart(2, '0')
                    });
                    _this.countTime();
                }
            })
        },
        countTime() {
            let _t = this;
            clearInterval(this.data.t);
            this.data.t = setInterval(function () {
                let h = parseInt(_t.data.h);
                let m = parseInt(_t.data.m);
                let s = parseInt(_t.data.s);
                s += 1;
                if (s > 59) {
                    s = 0;
                    m += 1;
                }
                if (m > 59) {
                    m = 0;
                    h += 1;
                }
                _t.setData({
                    h: h.toString().padStart(2, '0'),
                    m: m.toString().padStart(2, '0'),
                    s: s.toString().padStart(2, '0')
                });
            }, 1000);
        },
        beginServices(ev) {
            let { id, index } = ev.currentTarget.dataset;
            this.setData({
                [`list[${index}].status`]: 3,
                [`list[${index}].startTime`]: new Date()
            })
            this.getServicesTime();
        }
    }
})