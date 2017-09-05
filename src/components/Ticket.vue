<template>
    <div id="ticket">
        <tab>
            <tab-item selected @click="hotMovie">正在热映</tab-item>
            <tab-item @click="movieComing">即将上映</tab-item>
        </tab>
        <router-view></router-view>
    </div>
</template>
<script>
    import { Tab,TabItem } from 'vux'

    export default {
        name: 'ticket',
        data(){
            return {

            }
        },
        components: {
            Tab,
            TabItem
        },
        methods: {
            hotMovie(){
                this.$router.push('/hotMovie');
            },
            movieComing(){
                this.$router.pust('/movieComing');
            }
        }
    }
</script>
<style>

</style>
