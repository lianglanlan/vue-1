<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
            <span>点击：{{newsInfo.click}}次</span>
        </p>
        <hr>
        <div class="content">{{newsInfo.content}}</div>

        <!-- 评论组件区 -->
        <comment-box :id="id"></comment-box>
    </div>
</template>
<script>
//导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    data() {
        return {
            id: this.$route.params.id,
            newsInfo: {}
        }
    },
    created() {
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo() {
            this.$http.get('getnew',{params:{newid: this.id}}).then(result => {
                if(result.status === 200) {
                    this.newsInfo = result.data.message[0]
                }
            })
        }
    },
    components: {   //用来注册子组件
        'comment-box':comment
    }
}
</script>
<style lang="scss" scoped>
.newsinfo-container {
    padding: 0 4px;

    .title {
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }

    .subtitle {
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }

}
</style>
