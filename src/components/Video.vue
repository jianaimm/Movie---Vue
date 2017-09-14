<template>
    <div id="video" v-if="videoList.length">
        <x-header
            :left-options="{showBack: true,backText: ''}"
            :title="videoPlay.title"
            :right-options="{showMore:false}"
        >
        </x-header>
        <div class="videoWrap">
            <video :src="videoPlay.url" controls="controls" autoplay></video>
        </div>

    </div>
</template>
<script>
    import { XHeader } from 'vux';

    export default {
        name: 'video',
        data(){
            return {
                videoList: {},
                num: this.$route.params.num
            }
        },
        computed: {
            videoPlay(){
                if(this.videoList.length){
                    for(var i = 0;i < this.videoList.length;i++){
                        if(i == this.num){
                            return this.videoList[i];
                        }
                    }
                }
            }
        },
        created(){
            this.$store.commit('updateLoading',1);
            fetch('/api/Movie/Video.api?pageIndex=1&movieId='+this.$route.params.id)
                .then( res => {
                    return res.json();
                }).then( result => {
                    this.$store.commit('updateLoading',0)
//                console.log(result);
                this.videoList = result.videoList;
//                console.log('videoList',this.videoList[this.num])
//                console.log('num',this.num)
            })
        },
        components: {
            XHeader
        }
    }
</script>
<style>

    #video .vux-header .vux-header-title {
        margin: 0 20px;
        font-size: 14px;
    }
    .videoWrap {
        position: absolute;
        left: 0;
        top: 42px;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.8);
    }
    .videoWrap video {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-55%);
        width: 100%;
    }
</style>
