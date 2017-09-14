

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: 0,//记录是否正在加载，显示加载的loading图；
        isLogin: false,//记录是否是登录状态
        userName: '',//用户名
        address: {//所在城市信息
            addressId: '292',
            addressCity: '上海'
        },
        movieTickets: {},//正在售票
        movieViewing: {},//正在上映
        movieComing: {},//即将上映
        slideData: [],//首页轮播图数据
        topList: [],//首页跑马灯数据
        moreList: []//首页 上拉加载更多数据
    },
    getters: {
        slideData(state) {
            return state.slideData;
        },
        topList(state) {
            return state.topList;
        },
        moreList(state) {
            return state.moreList;
        }
    },
    mutations: {
        updateLoading(state,data){//更新loading状态
            state.isLoading = data;
        },
        updateIsLogin(state,data){//更新登录状态
            state.isLogin = data;
        },
        updateUserName(state,data){//更新用户名
            state.userName = data;
        },
        updateAddress(state,data){//更新所在城市
             state.address = {
                addressId: data.id,
                addressCity: data.n
            };
        },
        updateMovieTickets(state,data){//更新正在售票电影列表
            state.movieTickets = data;
        },
        updateMovieViewing(state,data){//更新正在热映电影列表
            state.movieViewing = data;
        },
        updateMovieComing(state,data){//更新即将上映电影列表
            state.movieComing = data;
        },
        updateSlideData(state, data) {//更新首页轮播图数据
            state.slideData = data;
        },
        updateTopList(state, data) {//更新首页跑马灯数据
            state.topList = data;
        },
        updateMoreList(state, data) {//更新首页加载更多数据
            state.moreList = state.moreList.concat(data);
        }

    },
    actions: {
        setAddress(){//设置城市
           return fetch('/api/Showtime/HotCitiesByCinema.api').then(res => {
                return res.json();
            });
        },
        setMovieTickets({commit},newId){//请求正在售票电影列表
            commit('updateLoading',1);
            return fetch('/api/PageSubArea/HotPlayMovies.api?locationId='+ newId).then(res => {
                    return res.json();
                }).then( data => {
                    console.log('正在售票',data.movies)
                    commit('updateLoading',0)

                    data.movies.forEach((item) => {
                        item.t = item.titleCn;
                    })
                    commit('updateMovieTickets',data.movies);
                });
        },
        setMovieViewing( {commit},newId ){//请求正在热映电影列表
            return fetch('/api/Showtime/LocationMovies.api?locationId='+ newId)
                .then(res => {
                    return res.json();
                }).then(data => {
                    data.ms.forEach(item => {
                        item.movieId = item.id;
                    })
                    commit('updateMovieViewing',data.ms);
                });
        },
        setMovieComing({commit},newId){//请求即将上映电影列表
            // console.log('更新即将上映',newId)
            return fetch('/api/Movie/MovieComingNew.api?locationId='+ newId)
                .then(res => {
                    return res.json();
                }).then(data => {
                    // console.log(data)
                    data.moviecomings.forEach((item) => {
                        item.img = item.image;
                        item.t = item.title;
                        item.movieId = item.id;
                    })
                    commit('updateMovieComing',data.moviecomings);
                    // console.log('更新即将上映')
                })
        },
        getTopList(store){
            Vue.jsonp('http://3g.163.com/touch/jsonp/sy/recommend/0-9.html').then( data => {
                // console.log(data);
                if(data.code == 200){//如果请求成功;
                    //轮播图
                    let slideData = data.focus.filter( item => {
                        return item.addata == null;//addata值不为null,代表是广告，我们过滤掉
                    }).map( item => {
                        return {
                            title: item.title,
                            img: item.picInfo[0].url,
                            url: item.link
                        }
                    })
                    //跑马灯
                    let topList = data.list.filter( item => {
                        return item.addata == null;
                    } ).map( item => {
                        return {
                            title: item.title,
                            src: item.picInfo[0].url,
                            desc: item.category
                        }
                    } );
                    store.commit('updateSlideData', slideData);
                    store.commit('updateTopList', topList);
                }

            })
        },

        refreshTopList(store, {refreshKey}) {
            return Vue.jsonp('http://3g.163.com/touch/jsonp/sy/recommend/0-9.html', {
                miss: '00',
                refresh: refreshKey
            })
                .then( data => {
                    let topList = data.list.filter( item => {
                        return item.addata == null;
                    } ).map( item => {
                        return {
                            title: item.title,
                            src: item.picInfo[0].url,
                            desc: item.category
                        }
                    } );

                    store.commit('updateTopList', topList);

                    return Promise.resolve(topList.length);
                } )
        },

        loadMoreList(store, {refreshKey, page, prepage}) {
            let start = page*prepage;
            let end = start + prepage;
            return Vue.jsonp(`http://3g.163.com/touch/jsonp/sy/recommend/${start}-${end}.html`, {
                miss: '00',
                refresh: refreshKey
            })
                .then( data => {
                    // console.log(data);
                    let moreList = data.list.filter( item => {
                        return item.addata == null && item.picInfo.length;
                    } ).map( item => {
                        return {
                            title: item.title,
                            src: item.picInfo[0].url,
                            desc: item.digest
                        }
                    } );

                    // console.log(moreList);

                    store.commit('updateMoreList', moreList);

                    return Promise.resolve();
                } )
        }

    }
})

