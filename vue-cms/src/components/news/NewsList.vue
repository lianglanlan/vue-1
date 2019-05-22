<template>
    <div>
       <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media">
                <a href="javascript:;">
                    <img class="mui-media-object mui-pull-left" src="http://yuedu.sogou.com/images/user_photo.png">
                    <div class="mui-media-body">
                        <h1>幸福</h1>
                        <p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
                    </div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media">
                <a href="javascript:;" class="">
                    <img class="mui-media-object mui-pull-left" src="http://yuedu.sogou.com/images/user_photo.png">
                    <div class="mui-media-body">
                        木屋
                        <p class="mui-ellipsis">想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
                    </div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media">
                <a href="javascript:;">
                    <img class="mui-media-object mui-pull-left" src="http://yuedu.sogou.com/images/user_photo.png">
                    <div class="mui-media-body">
                        CBD
                        <p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        getNewsList( ){
            this.$http.get()
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