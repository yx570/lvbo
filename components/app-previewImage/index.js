// components/app-previewImage/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imgList: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        prevImg(e) {
            let current = e.target.dataset.src;
            wx.previewImage({
                current: current,
                urls: this.properties.imgList,
                success: res => {
                    this.triggerEvent('success', res)
                },
                fail: res => {
                    this.triggerEvent('fail', res)
                },
                complete: res => {
                    this.triggerEvent('complete', res)
                },
            });
        }
    }
})