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
    },
    ready() {
        this.getServicesTime();
    },

    /**
     * 组件的方法列表
     */
    methods: {
    }
})