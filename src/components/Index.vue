<template>

    <div id="index">
        <view-box>
            <x-header
                slot="header"
                :left-options="{showBack: false}"
                title="时光网"
                :right-options="{showMore:false}"
            >
                <div slot="overwrite-left">
                    <strong class="chooseCity" @touchend="toggle()">
                        <span>{{ address.addressCity }}</span>
                        <img src="../assets/down2.png"/>
                    </strong>
                    <div class="cityList">
                        <!--<mu-raised-button label="toggle drawer" @click="toggle()"/>-->
                        <mu-drawer :open="open" @close="toggle()">
                            <mu-appbar :title="'当前城市:'+ address.addressCity"/>
                            <mu-list>
                                <mu-list-item
                                    v-for="add in addressList"
                                    @touchend.native="changeCity(add.id)"
                                    :title="add.n"
                                />

                            </mu-list>
                            <x-button plain @click.native="open = false" type="primary">确定</x-button>
                        </mu-drawer>
                    </div>
                </div>
                <span>
                    <img class="logo" @touchend="toIndex" src="../assets/logo_mtime.png"/>
                </span>
                <span @touchend="toSearch" slot="right">
                    <icon class="scan" type="search"></icon>
                </span>
            </x-header>
            <!--上下滑屏区域-->
            <scroller
                class="my-scroller"
                :on-refresh="refresh"
                :on-infinite="infinite"
                ref="myScroller"
            >
                <!--轮播图-->
                <swiper :list="slideData"
                        :loop="true"
                        :auto="true"
                        dots-position="center"
                        :interval="3000"
                        :duration="800"
                        v-model="slideIndex"
                        dots-class="dot"
                ></swiper>
                <!--跑马灯-->
                <marquee class="my-marquee">
                    <marquee-item class="my-marquee-item" v-for="data, i in slideData" :key="i">{{data.title}}</marquee-item>
                </marquee>
                <!--电影售票-->
                <div class="hot" v-if="tickets.length" >
                    <h3 class="hotView">正在售票
                        <span>({{tickets.length }}部)</span>
                    </h3>
                    <gird-list :hotViews="tickets" ></gird-list>
                </div>
                <div class="hot" v-if="hotViews.length">
                    <h3 class="hotView">正在热映
                        <span>({{hotViews.length }}部)</span>
                    </h3>
                    <gird-list :hotViews="hotViews"></gird-list>
                </div>
                <div class="hot" v-if="movieComings.length">
                    <h3 class="hotView">即将上映
                        <span>({{movieComings.length }}部)</span>
                    </h3>
                    <gird-list :hotViews="movieComings"></gird-list>
                </div>
                <!--今日热点，上拉加载-->
                <div class="hot">
                    <panel header="今日热点" :list="topList" ></panel>
                    <panel
                        :list="moreList"
                    ></panel>
                </div>
            </scroller>
        </view-box>
        <div v-show="isLoading" class="loading">
            <img src="../assets/loading.gif"/>
        </div>
    </div>

</template>
<script>
    import axios from 'axios'
    import { ViewBox,XHeader,Icon,Swiper,Panel,XButton,Toast,Marquee,MarqueeItem } from 'vux'
    import GirdList from './GirdList.vue'

//refreshKey 数组里的值，是该接口默认的值；
    const refreshKey = ['A', 'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B09', 'B010'];
    let refreshKeyIndex = 0;
    let page =0;
    let prepage = 10;
    let firstLoaded = false;
    let moreLoaded = true;
    function getRefreshKey() {
        refreshKeyIndex++;
        if (refreshKeyIndex >= refreshKey.length) {
            refreshKeyIndex = 0;
        }
        return refreshKey[refreshKeyIndex];
    }

    export default {
        name: 'index',
        data(){
            return {
                slideIndex: 2,//当前播放第几张图片；
                open: false,//是否展开侧边栏 - 地址栏
                addressList: {}//地址栏城市列表
            }
        },
        computed: {
            isLoading(){//是否正在加载，请求数据
                return this.$store.state.isLoading
            },
            address(){//当前城市
                return this.$store.state.address
            },
            tickets(){//正在售票
                return this.$store.state.movieTickets
            },
            hotViews(){//正在热映
                return this.$store.state.movieViewing
            },
            movieComings(){//即将上映
                return this.$store.state.movieComing
            },
            slideData(){//轮播图
                return this.$store.getters.slideData
            },
            topList(){//跑马灯
                return this.$store.getters.topList
            },
            moreList(){//上拉加载
                return this.$store.getters.moreList
            }
        },
        components: {
            ViewBox,
            XButton,
            XHeader,
            Icon,
            Swiper,
            GirdList,
            Panel,
            Marquee,
            MarqueeItem
        },
        methods: {
            toIndex(){//跳到首页
                this.$router.push('/');
            },
            toSearch(){//跳到搜索页面
                this.$router.push('/search');
            },
            toggle () {//展开/收缩 侧边地址栏
                this.open = !this.open
            },
            changeCity(aId){//更改当前城市

                this.addressList.forEach(item => {
                    if(aId == item.id){
                        this.$store.commit('updateAddress',item);
                        this.$store.dispatch('setMovieTickets',aId);
                        this.$store.dispatch('setMovieViewing',aId);
                        this.$store.dispatch('setMovieComing',aId);
                    }
                })
                this.open = false;
            },
            refresh(){//下拉刷新
//                console.log('下拉刷新');
                setTimeout(() => {
                    this.$store.dispatch('refreshTopList', {
                        refreshKey: getRefreshKey()
                    })
                        .then(n => {
                            this.$refs.myScroller.finishPullToRefresh();
                            // this.$vux.toast.show({
                            //     text: '成功为您推荐10条新内容'
                            // });
                            this.$vux.toast.text(`成功为您推荐${n}条新内容`, 'top');
                        })
                }, 1000);
            },
            infinite(){//上拉加载
//                console.log('上拉加载');
                if (!firstLoaded) {
                    this.$refs.myScroller.finishInfinite();
                    return;
                }
                if (!moreLoaded) {
                    return;
                }
                // console.log(moreLoaded);
                // console.log('infinite');
                moreLoaded = false;
                page++;
                setTimeout(() => {
                    this.$store.dispatch('loadMoreList', {
                        refreshKey: refreshKey[refreshKeyIndex],
                        page,
                        prepage
                    })
                        .then(() => {
                            this.$refs.myScroller.finishInfinite();
                            // this.$vux.toast.text('加载成功', 'top');
                            moreLoaded = true;
                        })
                }, 1000);
            }
        },
        created(){
            //更改所在城市：
            this.$store.dispatch('setAddress',this.address.addressId).then( res => {
//                console.log('setAddress',this.address)
//                console.log(res.p);
                this.addressList = res.p;

            });
            //获取轮播图及今日热点列表数据；
           this.$store.dispatch('getTopList').then( () => {
               setTimeout( () => {
                   firstLoaded = true;
               },300)
           });

            //正在售票
//            this.$store.commit('updateLoading',1);
            this.$store.dispatch('setMovieTickets',this.address.addressId);
            /*this.$store.dispatch('setMovieTickets',this.address.addressId).then( data => {
//                    console.log(data)
//                    this.$store.commit('updateLoadiding',0);
//                    this.tickets = data.movies;
                    this.$store.commit('updateMovieTickets',data.movies);

                });*/
            /*axios.get('/api/PageSubArea/HotPlayMovies.api?locationId='+this.address.addressId).then(res => {
//                console.log(res)
                console.log('售票',this.address.addressId);
                this.$store.commit('updateLoading',0);
                this.tickets = res.data.movies;
            })*/
            //正在热映
            this.$store.dispatch('setMovieViewing',this.address.addressId);
            /*this.$store.dispatch('setMovieViewing',this.address.addressId).then( data => {
//                    console.log(data)
//                    this.hotViews = data.ms;
                    data.ms.forEach(item => {
                        item.movieId = item.id;
                    })
                    this.$store.commit('updateMovieViewing',data.ms);
                });*/
            /*axios.get('/api/Showtime/LocationMovies.api?locationId='+ this.address.addressId)
                .then( res => {
//                    console.log(res);
                    console.log('热映',this.address.addressId);
                    this.hotViews = res.data.ms;
                    this.hotViews.forEach(item => {
                        item.movieId = item.id;
                    })
                });*/
            //即将上映
            this.$store.dispatch('setMovieComing',this.address.addressId);
            /*this.$store.dispatch('setMovieComing',this.address.addressId).then(data => {
//                    console.log(data);
//                    this.movieComings = data.moviecomings;
                    //由于复用了girdList组件，传入的值不同，对象里面的属性名不一致，在此处改成一致的再传入，就可以了；或者直接在组件里面判断有没有该属性，没有就用另外一个属性的方法；
                    data.moviecomings.forEach((item) => {
                        item.img = item.image;
                        item.t = item.title;
                        item.movieId = item.id;
                    })
                    this.$store.commit('updateMovieComing',data.moviecomings);

                })*/
            /*axios.get('/api/Movie/MovieComingNew.api?locationId='+ this.address.addressId)
                .then(res => {
//                    console.log(res);
                    console.log('即将上映',this.address.addressId);
                    this.movieComings = res.data.moviecomings;
                    this.movieComings.forEach((item) => {
                        item.img = item.image;
                        item.t = item.title;
                        item.movieId = item.id;
                    })
                })*/
        }

    }
</script>
<style lang="less">
    html, body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }
    #index {
        height: 100%;
        background: #f6f6f6;

        .my-scroller {
            padding-bottom: 80px;
        }
        .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc {
            padding-top: 0;
            height: 1.6em;
        }
        .vux-slider > .vux-indicator, .vux-slider .vux-indicator-right {
            bottom: 18px;
        }
        .weui-media-box__hd,  .weui-media-box__hd img {
            width: 102px;
            height: 78px;
        }

        .weui-media-box__bd {
            height: 78px;
        }
        .vux-marquee-box li {
            line-height: 22px;
        }
        .vux-marquee {
            margin: 5px;
        }
    }

    #index .logo {
        width: 80px;
        height: 30px;
        padding-top: 5px;
    }
    #index .vux-header {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 99;
    }
    #index .vux-header .vux-header-left {
        line-height: 1;
    }
    #index .vux-slider {
        margin-top: 46px;
    }
    .scan {
        width: 30px;
        height: 30px;
    }
    #index .weui-icon-search {
        font-size: 25px;
    }
    .vux-indicator.dot .vux-icon-dot.active {
        background: red !important;
        color: red;
    }


    h3 {
        margin: 0;
    }
    #index .hotView {
        padding: 15px;
        font: bolder 18px/1 '微软雅黑';
    }
    .hot {
        margin-top: 10px;
        padding-bottom: 15px;
        background-color: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    /*loading图*/
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
    /*侧边地址栏*/
    /*#index .cityList {
        position: relative;
    }*/
    #index .mu-drawer {
        width: 100%;
    }

    #index button.weui-btn, input.weui-btn {
        position: absolute;
        right: 5%;
        top: 15px;
        width: 30%;
        color: #fff;
        line-height: 1.5;
    }
    #index .weui-btn_plain-primary {
        border-color: #fff;
    }
    .chooseCity {
        text-align: center;
    }
    .chooseCity span {
        display: block;
    }
    .chooseCity img {
        vertical-align: top;
        width: 20px;
        height: 20px;
    }
</style>
