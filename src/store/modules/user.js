import { setInfo, getInfo } from '@/utils/storage'

export default {
    namespaced: true,
    state () {
        return {
            userInfo: getInfo()
        }
    },
    mutations: {
        setUserInfo (sate, obj) {
            sate.userInfo = obj
            setInfo(obj)
        }
    },
    actions: {},
    getters: {}
}
