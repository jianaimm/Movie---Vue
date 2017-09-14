<template>
    <div id="ticket">
        <x-header
            :left-options="{showBack: true,backText: ''}"
            title="购票"
            :right-options="{showMore:false}"

        >
        <span slot="right" @click="toSearch">
            <icon class="scan" type="search"></icon>
        </span>
        </x-header>
        <tab>
            <tab-item selected @touchstart="hotMovie">正在热映</tab-item>
            <tab-item @touchstart="movieComing">即将上映</tab-item>
        </tab>
        <router-view></router-view>
    </div>
</template>
<script>
    import { XHeader,Tab,TabItem,Icon } from 'vux'

    export default {
        name: 'ticket',
        data(){
            return {

            }
        },
        components: {
            Tab,
            TabItem,
            XHeader,
            Icon
        },
        methods: {
            hotMovie(){
                this.$router.push('/hotMovie');
            },
            movieComing(){
                this.$router.push('/movieComing');
            },
            toSearch(){
                this.$router.push('/search')
            }
        }
    }
</script>
<style>
    #ticket {
        background: #f6f6f6;
    }

    #ticket .logo {
        width: 80px;
        height: 30px;
        padding-top: 5px;
    }
    #ticket .scan {
        width: 30px;
        height: 30px;
    }
    #ticket .weui-icon-search {
        font-size: 25px;
    }
</style>
