<template>
    <div>
        <div>
            <input
                type="file"
                @change="uploadFile"
            />
            <el-button
                class="ma-2"
                @click="updataFormData"
            >提交</el-button>
        </div>
        <el-button
            type="primary"
            class="ma-2"
            @click="getUser(1)"
        >获取用户</el-button>
        <el-button
            type="primary"
            class="ma-2"
            @click="getUser(2)"
        >获取博客</el-button>
        <el-button
            class="ma-2"
            @click="addComponent"
        >加载组件</el-button>
        <el-button
            class="ma-2"
            @click="getZip"
        >加载zip</el-button>
        <el-button
            class="ma-2"
            @click="changeZip"
        >解压</el-button>
        <el-button
            class="ma-2"
            @click="getPluginList"
        >获取插件列表</el-button>
        <el-button
            type="danger"
            class="ma-2"
            @click="goDetail"
        >插件详情</el-button>
        <asyncCom
            :asyncC="asyncC"
            :url="url"
        />
        <el-button
            class="ma-2"
            @click="snackbar = true"
        >消息提示</el-button>
        <div class="upload">
            <input
                class="upload_ipt"
                type="file"
                @change="uploadPluginMeth(1, $event)"
            />
            <el-button class="ma-2 btn">上传插件</el-button>
        </div>
        <div class="upload">
            <input
                class="upload_ipt"
                type="file"
                @change="uploadPluginMeth(2,$event)"
            />
            <el-button class="ma-2 btn">上传主题</el-button>
        </div>

        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
            <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
            >
            <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
            ></i>
        </el-upload>
    </div>
</template>

<script>
import axios from "axios";
import { getUser, upload, getBlogs, getzip, getUnzip, uploadPlugin, getPlugin, getPluginDetail, uploadTheme, getTheme } from "@/api/test";
import asyncCom from "./async-com";
export default {
    components: {
        asyncCom
    },
    data() {
        return {
            imageUrl: '',
            asyncC: "", //动态组件
            url: "",
            date1: new Date().toISOString().substr(0, 10),
            date2: '2013-07-29',
            snackbar: false,
            text: 'Hello, I\'m a snackbar',
            imgList: [],
            formData: new FormData()
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log("测试", res, file)
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {

        },
        async uploadFile(e) {
            let file = e.target.files[0];
            this.imgList.push(file)

            this.formData = new FormData();

            this.imgList.forEach((curr, index) => {
                this.formData.append(`file[${index}]`, curr);
            })
        },
        async updataFormData() {
            const res = await upload(this.formData);
            console.log("res", res);
        },
        async getUser(type) {
            let url = getUser;
            let query = {
                currentPage: 1,
                pageSize: 3
            };
            if (type === 2) {
                url = getBlogs;
                query.id = 1;
            }
            const res = await url(query);
            console.log("res", res);
        },
        addComponent() {
            // axios.get("http://localhost:3000/TestVue/index.776d8cfd.js").then((res) => {
            //     const asynFn = new Function(`return function (){${res.data} ;return root}`)()()
            //     this.asyncC = asynFn.default || asynFn
            // })
            // this.url = "http://localhost:3000/TestVue/index.776d8cfd.js"
            this.url = "http://localhost:3000/plugin/index.js"
        },
        async getZip() {
            const res = await getzip();
            console.log("res", res);
        },
        async changeZip() {
            const res = await getUnzip();
            console.log("res", res);
        },
        getPluginList() {
            this.$router.push("/pluginList")
        },
        async getTheme() {
            const res = await getTheme({
                currentPage: 1,
                pageSize: 2
            });
            console.log("主题列表", res)
        },
        goDetail() {
            this.$router.push({
                path: "/detail",
                query: {
                    id: 10
                }
            })
        },
        async uploadPluginMeth(type, e) {
            let uploadUrl = uploadPlugin
            let file = e.target.files[0];
            let formData = new FormData();
            formData.append("file", file);
            if (type === 2) {
                uploadUrl = uploadTheme
            }

            const res = await uploadUrl(formData);
            console.log("res", res);
            // 上传完成展示插件
            // http://localhost:3000/getPlugin/1599057651723.test.zip/index.js
            const BaseUrl = 'http://localhost:3000';
            this.url = BaseUrl + res.url;
            console.log("url", this.url)
        }
    }
};
</script>

<style lang="scss" scoped>
.upload {
    position: relative;
    &_ipt {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 95px;
        height: 36px;
        z-index: 33;
    }
    .btn {
    }
}
</style>