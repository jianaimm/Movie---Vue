<template>
    <div id="trailer">
        <view-box>
            <!--头部-->
            <x-header
                slot="header"
                :left-options="{showBack: true,backText: ''}"
                :title="movieTitle+' - 预告片&拍摄花絮'"
                :right-options="{showMore:false}"
            >
            </x-header>
            <!--滑屏区域，使用Vue-scroller组件实现上拉加载，下拉刷新,通过ref属性，来使用实例化方法-->
            <scroller
                class="my-scroller"
                :on-refresh="refresh"
                :on-infinite="infinite"
                :noDataText="'木有啦~'"
                ref="myRef"
            >
                <ul class="videoList" v-if="videoList.length">
                    <li v-for="video,index in videoList">
                        <div class="videoImg">
                            <img :src="video.image" referrerpolicy="no-referrer"/>
                            <router-link :to="{name: 'Video',params: {id: movieId,num: index}}" class="videoU">
                                <img src="../assets/play.png" />
                            </router-link>
                        </div>

                        <div class="videoCons">
                            <h5>{{video.title}}</h5>
                            <p>时长：{{ video.length | formatTime }}</p>
                        </div>
                    </li>
                </ul>
            </scroller>


        </view-box>
        <div v-show="isLoading" class="loading">
            <img src="../assets/loading.gif"/>
        </div>
    </div>
</template>
<script>
    import { ViewBox,XHeader } from 'vux'
    import formatTime from '@/filters/formatTime'
//    import ViewBox from "../../node_modules/vux/src/components/view-box/index";


    export default {
        name: 'trailer',
        data() {
            return {
                videoList: [],//预告片列表
                movieId: this.$route.params.id,
                movieTitle: '',
                page: 0,//当前页数
                totalPages: 1,//总页数
                isNoMoreData: false//是否已经没有数据可加载了
            }
        },
        computed: {
            isLoading(){
                return this.$store.state.isLoading
            }

        },
        created(){
            //初始化
            /*this.$store.commit('updateLoading',1)
            console.log('初始化',this.page)
            fetch('/api/Movie/Video.api?pageIndex='+ this.page +'&movieId='+this.$route.params.id)
                .then( res => {
                    return res.json();
                }).then( result => {

                    this.$store.commit('updateLoading',0);
//                    console.log('result',result)
                    this.videoList = result.videoList;
//                    console.log('videoList',this.videoList)
                    this.movieTitle = result.videoList[0].title.split(' ')[0];
//                    console.log(this.movieTitle)
                    this.totalPages = result.totalPageCount;
                })*/
        },
        components: {
            ViewBox, XHeader
        },
        filters: {
            formatTime
        },
        methods: {
            refresh(){
                console.log('下拉刷新')
//                下拉刷新结束，终止下拉刷新；
                this.$refs.myRef.finishPullToRefresh();
            },
            infinite(){
                console.log('上拉加载')
                if(this.page >= this.totalPages) {
                    this.page = this.totalPages;
                    this.isNoMoreData = true;
                    this.$refs.myRef.finishInfinite(this.isNoMoreData);

                    return;
                } else {
                    this.page++;
                }
                console.log('当前页',this.page,'总页数',this.totalPages)
                //上拉加载；
                fetch('/api/Movie/Video.api?pageIndex='+ this.page +'&movieId='+this.$route.params.id)
                    .then( res => {
                        return res.json();
                    }).then( result => {

                        console.log('result',result)
                        this.videoList = this.videoList.concat(result.videoList);
                        this.totalPages = result.totalPageCount;

//                        console.log('videoList',this.videoList)
                        //上拉加载结束，终止上拉加载；
                        this.$refs.myRef.finishInfinite(this.isNoMoreData);

//                        console.log('现在页',this.page,'总页数',this.totalPages)
                    })
            }
        }
    }
</script>
<style lang="less">
    body {
        margin: 0;
    }
    html, body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }
    #trailer {
        height: 100%;
        /*padding-bottom: 80px;*/
        .my-scroller {
            margin-top: 46px;
        }
        .loading-layer {//上拉加载loading图片
            padding-bottom: 120px;
        }
    }
    #trailer .vux-header {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 99;
    }
    #trailer .vux-header .vux-header-title {
        margin: 0 20px;
        font-size: 14px;
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    h5,
    p {
        margin: 0;
    }
    img {
        vertical-align: top;
    }
    .videoList li {
        padding: 20px 10px;
        overflow: hidden;
        border-bottom: 1px solid #edeff2;
    }

    .videoList .videoImg {
        position: relative;
        float: left;
        vertical-align: top;
        border: 1px solid #ccc;
        padding: 1px;
        width: 45%;
        height: 90px;
    }
    .videoImg img:nth-of-type(1){
        width: 100%;
        height: 100%;
    }
    .videoImg .videoU{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 40%;
    }
    .videoU img {
        width: 100%;
        height: auto;
    }
    .videoList .videoCons {
        float: left;
        margin-left: 5%;
        width: 48%;
        font: 16px/26px arial,'微软雅黑';
    }
    .videoList h5 {
        font: bold 18px/1.5 arial,'微软雅黑';
    }
    /**/
    .loading {
        position: fixed;
        left: 0;
        top: 46px;
        right: 0;
        bottom: 75px;
        background: #fff;
        z-index: 9;
    }
    .loading img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%) scale(1.1);
    }
</style>
