<template>
    <div id="girdList">
        <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-inline-demo">
                <mu-grid-tile
                    @touchend.native="movieDetail(hotlist[index].movieId)"

                    titleBarClass="movieTitle"
                    v-for="tile, index in hotlist"
                    :cellHeight="200"
                    :key="index"
                >
                    <!--<img :src="tile.img||tile.image"/>
                    <span slot="title">{{tile.t||tile.title}}</span>-->
                    <img :src="tile.img"/>
                    <span slot="title">{{tile.t}}</span>
                </mu-grid-tile>

            </mu-grid-list>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'girdList',
        props: ['hotViews'],
        data(){
            return {
                id: ''
            }
        },
        computed: {
            hotlist() {
                return this.hotViews
            }
        },
        mounted(){
//            console.log(this.hotlist,this.hotViews)

        },
        methods: {
            movieDetail(id){
//                console.log(id,'点击')
                this.$router.push('/movieDetail/'+id);
            }
        }
    }
</script>
<style>
    .gridlist-demo-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .gridlist-inline-demo{
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
    }
    .gridlist-inline-demo>div {
        width: 33.5% !important;
    }
    #girdList .gridlist-demo-container {
        padding: 0 15px;
    }
    .mu-grid-tile-title {
        /*text-align: center;*/
    }

</style>
