<template>
    <div id="app">

        <router-view></router-view>
        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="tab1" icon="home" title="首页" @touchstart.native="toIndex"/>
            <mu-tab value="tab2" icon="favorite" title="购票" @touchstart.native="toTicket"/>
            <mu-tab value="tab3" icon="shop" title="商城" @touchstart.native="toShop"/>
            <mu-tab value="tab5" icon="person" title="我的" @touchstart.native="toLogin"/>

        </mu-tabs>
        <!--<div v-show="isLoading" class="loading">
            <img src="./assets/loading.gif"/>
        </div>-->
    </div>
</template>

<script>

import axios from 'axios'
import { Icon } from 'vux';

export default {
    name: 'app',
    data(){
        return {
            activeTab: 'tab1'
        }
    },
    computed: {
        isLoading(){
            return this.$store.state.isLoading
        }
    },
    components: {
        Icon
    },
    created(){
//        console.log(this.isLoading,this.$store.state.isLoading)
    },
    methods: {
        toIndex(){
            this.$router.push('/');
        },
        toTicket(){
            this.$router.push('/ticket')
        },
        toShop(){
            this.$router.push('/shop')
        },
        toLogin(){
            this.$router.push('/login')
        },
        handleTabChange (val) {
            this.activeTab = val
        }
    },
    mounted(){
//获取本地数据时，存放在static目录下面,可以直接获取；
        /*axios.get('/static/json/payedorder.js').then(data=>{
            console.log(data)
        })*/
    }

}
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';

    body {
        margin: 0;
    }
    html,
    body {
        height: 100%;
    }
    img {
        vertical-align: top;
    }
    #app {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .mu-tabs {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 99;
    }
    .loading {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 75px;
        background: #fff;
    }
    .loading img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%) scale(1.1);
    }
</style>
