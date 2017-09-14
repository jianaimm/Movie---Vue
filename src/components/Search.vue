<template>
    <div id="search">
        <x-header
            :left-options="{showBack: true,backText: ''}"
            title="时光网"
            :right-options="{showMore:false}"
        >
        <span>
            <img class="logo" @touchend="toIndex" src="../assets/logo_mtime.png"/>
        </span>
        </x-header>
        <div class="searchTitle">
            <mu-text-field
                hintText="搜索内容"
                type="text"
                v-model="val"
                @input="recommend"
            />
            <img @touchend="toSearch" src="../assets/searchH.png"/>
            <!--根据有无搜索内容 -- val，显示下面的搜索列表-->
            <ul v-if="val" class="movieRecommend">
                <li v-for="movieRe,index in movieRecommend" @touchend="searchMovie(movieRe,index)">
                    {{ movieRe.title }}
                </li>
            </ul>
        </div>
        <!--根据有无点击搜索 -- isSearch，显示下面的搜索列表-->
        <div id="searchList" v-if="isSearch">
            <h4>搜索'{{val}}'的结果共有{{total}}条：</h4>
            <ul class="searchMovies">
                <li v-for="movie,index in searchList" @touchend="toActive(movie.id,index)">
                    <img :src="movie.images.small" referrerpolicy="no-referrer"/>
                    <div class="movieCons">
                        <h5>{{movie.title}}</h5>
                        <p>
                            类型：<span v-for="type,index in movie.genres">{{type}}<span v-if="index != movie.genres.length-1">/</span></span>
                        </p>
                        <p class="rating">评分：
                            <span v-if="movie.rating.average" class="bg">{{movie.rating.average | formatNumber}}</span>
                            <span v-else >暂无</span>
                        </p>
                        <p>上映时间：{{ movie.year }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div v-show="isLoading" class="loading">
            <img src="../assets/loading.gif"/>
        </div>
    </div>
</template>
<script>
    import { XHeader,Icon } from 'vux'
    import formatNumber from '@/filters/formatNumber'

    export default {
        name: 'search',
        data(){
            return {
                val: '',//绑定input的value值
                searchList: {},//搜索的电影列表
                total: 0,//搜索的总数量
                movieRecommend: {},//关键字输入时下拉列表推荐
                isSearch: false,//是否点击搜索按钮

            }
        },
        computed: {
            isLoading(){
                return this.$store.state.isLoading
            }
        },
        methods: {
            toIndex(){
                this.$router.push('/');
            },
            recommend(){

                fetch('/searchMovie/movie/search?q='+this.val).then( res => {
                    return res.json();
                }).then(data => {
                    this.movieRecommend = data.subjects.splice(0,8);
                })
            },
            toSearch(){
                this.isSearch = true;
                var elMovieRecommend = document.querySelector('.movieRecommend');
                if(elMovieRecommend){
                    elMovieRecommend.style.display = 'none';
                }

                this.$store.commit('updateLoading',1);
                fetch('/searchMovie/movie/search?q='+this.val).then( res => {
                    return res.json();
                }).then(data => {
                    this.$store.commit('updateLoading',0)
                    console.log(data);
                    this.searchList = data.subjects;
                    this.total = data.total;
                })
            },
            toActive(id,n){
                var list = document.querySelector('.searchMovies');
                var lis = list.querySelectorAll('li');
                for(var i = 0;i < lis.length;i++){
                    lis[i].className='';
                }
                lis[n].className = 'active';
                this.$route.push('/movieDetail'+id);
            },
            searchMovie(value,nub){
                var elMovieRecommend = document.querySelector('.movieRecommend');
                if(elMovieRecommend){
                    var liAll = elMovieRecommend.querySelectorAll('li');
                    for(var i = 0;i < liAll.length;i++){
                        liAll[i].className='';
                    }
                    liAll[nub].className = 'active';
                    this.val = value.title;
                }
                this.toSearch();

            }
        },
        components: {
            XHeader,
            Icon
        },
        mounted(){
            /*console.log(this.$route.path)
            var loading = document.querySelector('.loading');
            if(this.$route.path == '/search'){
                loading.style.top='120px';
            } else {
                loading.style.top = 0;
            }*/
        },
        filters: {
            formatNumber
        }
    }
</script>
<style>
    html,
    body {
        height: 100%;
    }
    #search {
        position: relative;
        padding-bottom: 80px;
    }
    #search .vux-header {
        position: fixed;
        width: 100%;
        z-index: 99;
    }
    #search .logo {
        width: 80px;
        height: 30px;
        padding-top: 5px;
    }
    #search .searchTitle {
        padding-top: 42px;
        text-align: center;
    }
    #search .mu-text-field.focus-state {
        color: #7e57c2;
    }
    #search .mu-text-field-focus-line {
        background-color: #7e57c2;
    }
    #search .mu-text-field-content {
        padding-top: 30px;
    }
    h4,
    h5,
    p {
        margin: 0;
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #searchList h4 {
        text-indent: 20px;
        font: 16px/2 arial,'微软雅黑';
    }
    .searchMovies li {
        padding: 10px 20px;
        overflow: hidden;
        border-bottom: 1px solid #edeff2;
    }
    .searchMovies .active,
    .movieRecommend .active {
        background: rgba(0,0,0,.6);
        color: #fff;
    }
    .searchMovies img {
        float: left;
        vertical-align: top;
        border: 1px solid #ccc;
        padding: 1px;
        width: 30%;
        height: 130px;
    }
    .searchMovies .movieCons {
        float: left;
        margin-left: 5%;
        width: 60%;
        font: 16px/26px arial,'微软雅黑';
    }
    .searchMovies h5 {
        font: bold 18px/1.5 arial,'微软雅黑';
    }
    .rating span {
        display: inline-block;
        padding: 0 6px;

        border-radius: 3px;
    }
    .rating .bg {
        color: #fff;
        background: #659d0e;
    }
    /**/
    .searchTitle {
        position: relative;
    }
    .searchTitle img {
        width: 20px;
        height: 20px;
        vertical-align: top;
        margin-top: 30px;
    }
    .movieRecommend {
        position: absolute;
        left: 20px;
        top: 105px;
        width: 256px;
        text-align: left;
        text-indent: 10px;
        font: 16px/30px arial,'微软雅黑';
        border: 1px solid #edeff2;
        background: #fff;
    }
    /*Loading*/
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
