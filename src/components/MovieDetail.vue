<template>
    <scroller class="scollers" >
        <div id="movieDetail">
            <div class="filter">
                <img :src="movieDetail.image"/>
                <img :src="movieDetail.image"/>
            </div>
            <div class="movieIcons">
                <i class="fa fa-angle-left" aria-hidden="true"></i>
                <i class="fa fa-share-square-o" aria-hidden="true"></i>
                <i class="fa fa-star-o"></i>
            </div>

            <div class="introduction">
                    <div class="movieImage">
                        <img :src="movieDetail.image"/>
                    </div>
                    <div class="movieContent">
                        <h4>{{movieDetail.titleCn}}</h4>
                        <h5>{{ movieDetail.titleEn }}</h5>
                        <time>{{ movieDetail.runTime }}</time>
                        <p><span v-for="type,index in movieDetail.type">{{ type }}<span v-if="index != movieDetail.type.length-1">/</span></span></p>
                        <p>
                            <span>{{ movieDetail.release.date | formatDate('y年m月d日') }}</span>
                            <span>{{ movieDetail.release.location}}</span>
                        </p>
                        <x-button plain mini type="primary" style="border-radius:99px;">我想看</x-button>
                        <x-button plain mini type="primary" class="custom-primary-red">我要评分</x-button>
                        <span class="rate">{{ movieDetail.rating }}</span>
                    </div>
                </div>
            <div class="header">
                <div class="whiteBg"></div>
                <p class="suggest">"{{ movieDetail.commonSpecial }}"</p>
                <x-button plain type="primary" class="custom-primary-red ticketInfo">查影讯/购票</x-button>
            </div>
            <div class="openDetail">
                <p v-if="isContract" class="recommend">{{ movieDetail.content | substr }}</p>
                <p v-else class="recommend" >{{ movieDetail.content }}</p>
                <span @click="openDetail">
                 <img v-if="isContract" src="../assets/down.png"/>
                    <img v-else src="../assets/up.png"/>
            </span>
            </div>
            <div class="actors">
                <h4>
                    <span>{{movieActors.length}}位演员</span>
                     <a class="moreActors" href="javascript:;">
                         <img src="../assets/more.png"/>
                     </a>
                </h4>
                <div class="actorsList">
                    <div class="director">
                        <h5>导演</h5>
                        <img :src="movieDirector.image"/>
                        <p>
                            <span>{{ movieDirector.name }}</span>
                            <span v-if="movieDirector.nameEn">{{ movieDirector.nameEn }}</span>
                        </p>
                    </div>
                    <div class="actorsMore">
                        <h5>主要演员</h5>
                        <div
                            class="actorDetail"
                            v-if="index<2"
                            v-for="actor,index in movieActors"
                        >
                            <img :src="actor.image"/>
                            <p>
                                <span>{{ actor.name }}</span>
                                <span v-if="actor.nameEn">{{ actor.nameEn }}</span>
                            </p>
                            <img :src="actor.roleCover"/>
                            <p>饰：{{ actor.personate}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="moviePic">
                <h4>
                    <span>{{ moviePics.length }}张剧照</span>
                    <a class="moreActors" href="javascript:;">
                        <img src="../assets/more.png"/>
                    </a>
                </h4>
                <ul class="moviePicList">
                    <li  v-for="pic,index in showPics" :key="index">
                        <img :src="pic.image"/>
                    </li>
                </ul>
            </div>
            <div class="filmReview">
                <h4>
                    <span>精选影评（{{ moviePics.length }}）</span>
                    <a class="moreActors" href="javascript:;">
                        <img src="../assets/more.png"/>
                    </a>
                </h4>
                <div>
                    <h5>{{}}</h5>
                    <p>{{}}</p>
                    <div>
                        <img src=""/>
                        <p>
                            <span>{{}}</span>
                            <span>{{}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </scroller>
</template>
<script>
    import { Tab,TabItem,XButton,Icon } from 'vux';
    import formatDate from '../filters/formatDate.js'
    import substr from '../filters/substr'
    import GirdList from "./GirdList";

    export default {
        name: 'movieDetail',
        data() {
          return {
              movieDetail: {//影片详情
                  release: '',

              },
              movieDirector: {//导演

              },
              movieActors: {//演职员表

              },
              moviePics: {//剧照

              },
              showPics: {//显示的剧照

              },
              filmPlus: {//精选影评

              },
              filmMini: {//网友短评

              },
              isContract: true//影片介绍，是否是收起状态
          }
        },
        computed: {

        },
        created(){
            this.$store.commit('updateLoading',1);
            //影片详情
            fetch('/api/movie/detail.api?locationId='+290+'&movieId='+this.$route.params.movieId)
                .then( res => {
                    return res.json();
                }).then( data => {
//                    console.log(data);
                    this.movieDetail = data;
                this.$store.commit('updateLoading',0);
                })
            //演职员表
            fetch('/api/Movie/MovieCreditsWithTypes.api?movieId=' + this.$route.params.movieId).then(res => {
                return res.json();
            }).then(data => {
//                console.log(data)
                this.movieActors = data.types[1].persons;
                this.movieDirector = data.types[0].persons[0];
//                console.log(this.movieActors)
            })
            //剧照
            fetch('/api/Movie/ImageAll.api?movieId='+this.$route.params.movieId)
                .then(res => {
                    return res.json();
                }).then(data => {
//                    console.log(data)
                    this.showPics = data.images.slice(0,4);
                    this.moviePics = data.images;
                })
//            精选影评：此处的app代表的地址和api代表的地址不同；
            fetch('/ticket/movie/hotComment.api?movieId='+ this.$route.params.movieId)
                .then(res => {
                    return res.json();
                }).then(data => {
                    console.log(data)
                    this.filmPlus = data.plus;//精选影评
                    this.filmMini = data.mini;//网友短评
                })
        },
        components: {
            GirdList,
            Tab,
            TabItem,
            XButton,
            Icon
        },
        methods: {
            onItemClick (index) {
//                console.log('on item click:', index)
            },
            openDetail(){
                this.isContract = !this.isContract;
            }
        },
        filters: {
            formatDate,
            substr
        }
    }
</script>
<style lang="less">

    .custom-primary-red {
        border-radius: 99px!important;
        border-color: #CE3C39!important;
        color: #CE3C39!important;
    &:active {
         border-color: rgba(206, 60, 57, 0.6)!important;
         color: rgba(206, 60, 57, 0.6)!important;
         background-color: transparent;
     }
    }
    body,
    h4,
    h5,
    p {
        margin: 0;
    }
    #movieDetail {
        background: #f6f6f6;

    }

    .introduction {
        position: absolute;
        left: 0;
        top: 80px;
        z-index: 3;
        overflow: hidden;
    }
    .movieImage {
        float: left;
        margin-left: 2%;
        margin-top: 20px;
        width: 38%;
        border: 2px solid rgba(255,255,255,.6);
        height: 180px;
    }
    .movieImage img {
        width: 100%;
        height: 100%;
    }
    .movieContent {
        float: left;
        position: relative;
        width: 56%;
        margin-left: 4%;
        font: bold 14px/22px arial,'微软雅黑';
    }
    .movieContent h4 {
        margin-top: 20px;
        font: bolder 18px/38px arial,'微软雅黑';
        color: #fff;
    }
    .movieContent h5 {
        color: #fff;
        margin-bottom: 10px;
    }
    .whiteBg {
        height: 120px;
    }
    .header {
        padding-bottom: 20px;
        background: #fff;
    }
    .rate {
        position: absolute;
        right: 15px;
        top: 60px;
        padding: 0 3px;
        width: 30px;
        height: 30px;
        background: #659d0e;
        color: #fff;
        text-align: center;
        font: 16px/30px arial,'微软雅黑';
    }
    .suggest {
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center;
        font: 18px/30px arial,'微软雅黑';
        color: #ff8600;
    }
    #movieDetail .ticketInfo {
        background: #ff8600;
        width: 90%;
    }
    .ticketInfo.custom-primary-red {
        color: #fff!important;
    }
    .recommend {
        margin: 10px 0;
        padding: 15px 20px 10px;
        font: 16px/28px arial,'微软雅黑';
       /* display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;*/
    }
    .openDetail {
        position: relative;
        padding-bottom: 10px;
        background: #fff;
    }
    .openDetail span {
        position: absolute;
        left: 50%;
        margin-left: -10px;
        bottom: 0;
        width: 25px;
        height: 25px;
    }
    .openDetail img {
        width: 100%;
        height: 100%;
    }
    .actors {
        margin-top: 10px;
        background: #fff;
        padding: 10px;
    }
    .actors h4 {
        position: relative;
        width: 100%;
        font: 20px/40px arial,'微软雅黑';
    }

    .moreActors {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .moreActors img {
        width: 20px;
        height: 20px;
    }
    .actorsList {
        overflow: hidden;
    }
    .director {
       float: left;
        width: 33%;
        margin-right: 5px;
    }
    .director p {
        margin-top: 20px;
        text-align: center;
    }
    .director img {
        width: 100%;
        height: 180px;
    }
    .actorsMore {
        float: left;
        width: 65%;
        padding: 0 10px;
        box-sizing: border-box;
        border-left: 1px solid #cccccc;
    }
    .actorDetail {
        float: left;
        margin-right: 10px;
        width: 45%;
        text-align: center;
        font: 14px/22px arial,'微软雅黑';
    }
    .actorDetail p span {
        display: block;
    }
    .actorDetail p span:nth-of-type(1){
        height: 22px;
        overflow: hidden;
    }
    .actorDetail p span:nth-of-type(2){
       height: 44px;
        overflow: hidden;
    }
    .actorDetail img:nth-of-type(1) {
        width: 100%;
        height: 120px;
    }
    .actorDetail img:nth-of-type(2) {
        width: 60px;
        height: 60px;
    }
//头部背景模糊;
    .filter {
        position: relative;
        height: 160px;
        overflow: hidden;
    }
    .filter img {
        width: 100%;
        height: auto;
        -ms-filter: blur(10px);
        -moz-filter: blur(10px);
        filter: blur(10px);/*图片模糊效果*/
    }
    .filter img:nth-of-type(1){
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
    }
    .filter img:nth-of-type(2){
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        transform: scale(1.2);
    }
/*图标*/
    .movieIcons {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 3;
        box-sizing: border-box;
        padding: 20px;
        width: 100%;
        color: rgba(255,255,255,.6);
        font-size: 28px;
    }
    .movieIcons i:nth-of-type(1){
        float: left;
        padding: 0 5px;
    }
    .movieIcons i:nth-of-type(2),
    .movieIcons i:nth-of-type(3){
        float: right;
        margin-left: 10px;
    }
    .movieIcons i:hover {
        color: #fff;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    //剧照
    .moviePic {
        margin-top: 10px;
        background: #fff;
        padding: 10px 10px 75px;

    }
    .moviePic h4 {
        position: relative;
        width: 100%;
        font: 20px/40px arial,'微软雅黑';
    }
    .moviePicList li {
        float: left;
        width: 22%;
        margin: 0 1%;
    }
    .moviePicList img {
        width: 100%;
        height: 80px;

    }
    /*精选影评*/
    .filmReview {
        background: #fff;
    }
    .filmReview h4{
        position: relative;
    }

</style>
