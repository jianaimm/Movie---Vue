<template>
    <div id="app">

        <router-view></router-view>
        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="tab1" icon="home" title="首页" @click="toIndex"/>
            <mu-tab value="tab2" icon="favorite" title="购票" @click="toTicket"/>
            <mu-tab value="tab3" icon="shop" title="商城" @click="toShop"/>
            <mu-tab value="tab4" icon="movie" title="直播" @click="toBroadcast"/>
            <mu-tab value="tab5" icon="person" title="我的" @click="toUser"/>

        </mu-tabs>
        <div v-show="isLoading" class="loading">
            <img src="./assets/loading.gif"/>
        </div>
    </div>
</template>

<script>

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
        toBroadcast(){
            this.$router.push('/broadcast')
        },
        toUser(){
            this.$router.push('/user')
        },
        handleTabChange (val) {
            this.activeTab = val
        }
    }

}
</script>

<style>
    body {
        margin: 0;
    }
    img {
        vertical-align: top;
    }
    /*#app {
        position: relative;
        padding-bottom: 75px;
        height: 100%;
    }*/
    .mu-tabs {
        position: fixed;
        bottom: 0;
        left: 0;
    }
    .loading {
        /*display: none;*/
        position: absolute;
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
