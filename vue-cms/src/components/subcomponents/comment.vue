<template>
  <div class="cmt-container">
    <textarea placeholder="请输入内容" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
        <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
            <div class="cmt-title">第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}</div>
            <div class="cmt-body">{{item.content}}</div>
        </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageIndex: 1, //默认展示第一页
      comments: [],
      msg: '',   //评论输入的内容
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments() {
      this.$http
        .get("getcomments", {
          params: { artid: this.id, pageindex: this.pageIndex }
        })
        .then(response => {
          if (response.status === 200) {
            this.comments = this.comments.concat(response.data.message)
          } else {
            this.$toast("获取评论数据失败")
          }
        })
    },
    getMore(){
        this.pageIndex ++
        this.getComments()
    },
    postComment() { //发表评论
        //校验是否为空
        if(this.msg.trim().length === 0) {
            return this.$toast('评论内容不能为空')
        }
        this.$http.post('postcomment',{content:this.msg,artid:this.id}).then(response => {
            if(response.status === 200){
                let cmt = {
                    user_name: '匿名用户',
                    add_time: Date.now(),
                    content: this.msg.trim()
                }

                this.comments.unshift(cmt)
                this.msg = ''
            }
        })
    }
  },
  props: ["id"]
};
</script>
<style lang="scss" scoped>
.cmt-container {
    h3 {
        font-size: 18px;
    }

    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
}

.cmt-list {
  margin: 5px 0;
  font-size: 13px;

  .cmt-title {
    line-height: 30px;
    background-color: #ccc;
  }

  .cmt-body {
    line-height: 35px;
    text-indent: 2em;
  }
}
</style>

