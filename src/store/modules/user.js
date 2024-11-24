import { setInfo, getInfo } from '@/utils/storage'

export default {
    namespaced: true,
    state() {
        return {
            userInfo: getInfo()
        }
    },
    mutations: {
        setUserInfo(sate, obj) {
            sate.userInfo = obj
            setInfo(obj)
        }
    },
    actions: {
        logout(context) {
            context.commit('setUserInfo', {})
            context.commit('cart/setCartList', [], { root: true })
        }
    },
    getters: {}
}
