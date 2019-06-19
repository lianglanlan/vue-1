<template>
    <div>
       <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class="mui-ellipsis">
                            <span>发表时间: {{item.add_time | dateFormat}} </span>
                            <span>点击：{{item.click}} 次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            newsList: []
        }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        getNewsList( ){
            this.$http.get('example/1558607865243').then(result => {
                if(result.status === 200){
                    this.newsList = result.data.message
                }else {
                    this.$toast('获取新闻列表失败')
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.mui-media-body {
    h1 {
        font-size: 14px;
    }

    .mui-ellipsis {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #226aff;
    }
}
</style>