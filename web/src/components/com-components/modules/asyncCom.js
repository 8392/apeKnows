import axios from "axios";
import ElementUI from 'element-ui'
import Qs from 'qs'
import store from '../../../main.js'

export default {
    name: '',
    components: {

    },
    props: {
        url: {
            // 传入一个url, 用于异步请求组件，进行调用
            type: String
        },
    },
    data() {
        return {
            asyncNode: "",
        }
    },
    created() {
        this.loadingJs(this.url)
    },
    watch: {
        url: {
            handler(url) {
                this.loadingJs(url)
            }
        }
    },
    render() {
        const Node = this.asyncNode
        return <Node />
    },
    methods: {
        setAsyncNode(AsyncNode) {//注入一些全局的mixins，在组建的this中去调用
            // 设置组件
            this.asyncNode = {
                mixins: [AsyncNode],
                /* 扩展异步组件数据 */
                props: {
                    /* 扩展按钮权限 */
                    __permission__: {
                        type: [Array, String],
                        default: () => ([])
                    },
                    // 这个是需要在 header 里面动态传递的信息
                    __headers__: {  //把__header__传给每个异步组件，在每个组件this中拿到它
                        type: Object,
                        default: () => ({})
                    },
                    // 门户实例id
                    __portletInstanceId__: {
                        type: String,
                        default: ''
                    },
                    // 当前插件的目录地址
                    __url__: {
                        type: String,
                        default: ''
                    },
                }
            }
            // console.log("AAA", this.asyncNode)
        },
        async loadingJs(url) {
            let result = {}
            axios.get(url).then((res) => {
                const asynFn = new Function(`return function (axios, ElementUI, Qs, store){${res.data} ;return root}`)()
                result = asynFn(axios, ElementUI, Qs, store)
                const AsyncNode = result.default || result
                this.setAsyncNode(AsyncNode)
                // this.asyncNode = AsyncNode;
            })
        }
    }
}