<template>

    <div id="index">
        <x-header
            :left-options="{showBack: true,backText: '上海'}"
            title="时光网"
            :right-options="{showMore:false}"
            @on-click-more=""
        >
            <span>
                <img class="logo" @click="toIndex" src="../assets/logo_mtime.png"/>
            </span>
            <span slot="right">
                <icon class="scan" type="search"></icon>
            </span>
        </x-header>
        <swiper :list="baseList"
                :loop="true"
                :auto="true"
                :interval="1000"
                dots-position="center"
                :duration="800"
                v-model="n"
                dots-class="dot"
        ></swiper>

        <div class="hot" >
            <h3 class="hotView">正在售票
                <span>({{tickets.length }}部)</span>
            </h3>
            <gird-list :hotViews="tickets" ></gird-list>
        </div>
        <div class="hot">
            <h3 class="hotView">正在热映
                <span>({{hotViews.length }}部)</span>
            </h3>
            <gird-list :hotViews="hotViews"></gird-list>
        </div>
        <div class="hot" >
            <h3 class="hotView">即将上映
                <span>({{movieComings.length }}部)</span>
            </h3>
            <gird-list :hotViews="movieComings"></gird-list>
        </div>

        <div class="hot">

            <div>
                <panel header="今日热点" :footer="footer" :list="list" :type="type"></panel>
            </div>
        </div>
    </div>

</template>
<script>
    import { XHeader,Icon,Swiper,Panel } from 'vux'
    import GirdList from './GirdList.vue'

    export default {
        name: 'index',
        data(){
            return {
                n: 2,//当前播放第几张图片；
                baseList: [{//轮播图片
                    url: 'javascript:',
                    img: 'https://static.vux.li/demo/1.jpg',
                    title: '送你一朵fua'
                }, {
                    url: 'javascript:',
                    img: 'https://static.vux.li/demo/2.jpg',
                    title: '送你一辆车'
                }, {
                    url: 'javascript:',
                    img: 'https://static.vux.li/demo/3.jpg',
                    title: '送你一次旅行'
                }],
                tickets: [],//正在售票
                hotViews: [],//正在热映
                movieComings: [],//即将上映
                type: '1',
                list: [{
                    src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    title: '标题一',
                    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                    url: '/component/cell'
                }, {
                    src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    title: '标题二',
                    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                    url: {
                        path: '/component/radio',
                        replace: false
                    },
                    meta: {
                        source: '来源信息',
                        date: '时间',
                        other: '其他信息'
                    }
                }],
                footer: {
                    title: '查看更多',
                    url: 'http://vux.li'
                }
            }
        },
        computed: {
            isLoading(){
                return this.$store.state.isLoading
            }
        },
        components: {
            XHeader,
            Icon,
            Swiper,
            GirdList,
            Panel
        },
        methods: {
            toIndex(){
                this.$router.push('/');
            }
        },
        created(){
            //正在售票
            this.$store.commit('updateLoading',1);
            fetch('/api/PageSubArea/HotPlayMovies.api?locationId=290')
                .then(res => {
                    return res.json();
                }).then( data => {
//                    console.log(data)
                    this.$store.commit('updateLoading',0);
                    this.tickets = data.movies;
                });
            //正在热映
            fetch('/api/Showtime/LocationMovies.api?locationId=290')
                .then(res => {
                    return res.json();
                }).then( data => {
//                    console.log(data)
                    this.hotViews = data.ms;
                    this.hotViews.forEach(item => {
                        item.movieId = item.id;
                    })
//                    this.$store.commit('updateLoading',0);
                });
            //即将上映
            fetch('/api/Movie/MovieComingNew.api?locationId=290')
                .then(res => {
                    return res.json();
                }).then(data => {
//                    console.log(data);
                    this.movieComings = data.moviecomings;
                    //由于复用了girdList组件，传入的值不同，对象里面的属性名不一致，在此处改成一致的再传入，就可以了；或者直接在组件里面判断有没有该属性，没有用另外一个属性的方法；
                    this.movieComings.forEach((item) => {
                        item.img = item.image;
                        item.t = item.title;
                        item.movieId = item.id;
                    })
//                    this.$store.commit('updateLoading',0);
                })
        },

    }
</script>
<style>
    #index {
        background: #f6f6f6;
    }
    .vux-slider {
        margin-top: 46px;
    }
    .logo {
        width: 80px;
        height: 30px;
        padding-top: 5px;
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

</style>
