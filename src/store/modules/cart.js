import { getCartList, changeCount } from '@/api/cart'

export default {
    namespaced: true,
    state() {
        return {
            cartList: []
        }
    },
    mutations: {
        setCartList(state, newList) {
            state.cartList = newList
        },

        toggleCheck(state, goodsId) {
            const goods = state.cartList.find(item => item.goods_id === goodsId)
            goods.isChecked = !goods.isChecked
        },
        toggleAllCheck(state, flag) {
            state.cartList.forEach(item => {
                item.isChecked = flag
            })
        },
        changeCount(state, { goodsId, value }) {
            const obj = state.cartList.find(item => item.goods_id === goodsId)
            obj.goods_num = value
        }

    },
    actions: {
        async getCartAction(context) {
            const { data } = await getCartList()
            data.list.forEach(item => {
                item.isChecked = true
            })
            context.commit('setCartList', data.list)
        },
        async changeCountAction(context, obj) {
            const { goodsId, value, skuId } = obj
            context.commit('changeCount', {
                goodsId,
                value
            })
            await changeCount(goodsId, value, skuId)
        }
    },
    getters: {
        // 商品总数
        cartTotal(state) {
            return state.cartList.reduce((sum, item, index) => sum + item.goods_num, 0)
        },
        // 选中的商品列表
        selCartList(state) {
            return state.cartList.filter(item => item.isChecked)
        },
        // 选中的商品总数
        selCount(state, getters) {
            return getters.selCartList.reduce((sum, item, index) => sum + item.goods_num, 0)
        },
        // 选中的商品总价
        selPrice(state, getters) {
            return getters.selCartList.reduce((sum, item, index) => {
                return sum + item.goods_num * item.goods.goods_price_min
            }, 0).toFixed(2)
        },
        // 全选
        isAllChecked(state) {
            return state.cartList.every(item => item.isChecked)
        }
    }
}
