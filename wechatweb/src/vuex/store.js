import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
    // 统一管理接口域名 
let apiPublicDomain = '//vrapi.snail.com/'
const state = {
    currentLang: "zh", //当前使用的语言 zh：简体中文 en:英文 后期需要
    newMsgCount: 0, //新消息数量
    currentPageName: "微信", //用于在wx-header组件中显示当前页标题
    headerStatus: true, //显示（true）/隐藏（false）wx-header组件
    tipsStatus: false, //控制首页右上角菜单的显示(true)/隐藏(false)
    // 所有接口地址 后期需要
    apiUrl: {
        demo: apiPublicDomain + ""
    },
    msgList: {
        stickMsg: [], //置顶消息列表 后期需要
        baseMsg: [
        ]
    }
}
export default new Vuex.Store({
    state,
})