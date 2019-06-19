<template>
  <div class="photoinfo-container">
    <h3>标题</h3>
    <p class="subtitle">
      <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
      <span>点击：{{photoinfo.click}}次</span>
    </p>
    <hr>
    <!-- 缩略图 -->
    <div class="preview-wrap">
        <vue-preview :slides="slide1"></vue-preview>
    </div>
    <div class="content">{{photoinfo.content}}</div>
    <cmt-box :id="id"></cmt-box>
  </div>
</template>
<script>
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      slide1: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getTumbs()
  },
  methods: {
    getPhotoInfo() {
      this.$http
        .get("getimageInfo", { params: { imgid: this.id } })
        .then(response => {
          if (response.status === 200) {
            this.photoinfo = response.data.message;
          } else {
            this.$toast("图片信息获取失败");
          }
        })
    },
    getTumbs() {
        this.$http.get('getthumimages',{params:{imgid:this.id}}).then(response => {
            if(response.status == 200) {
                response.data.message.forEach(item => {
                    item.w = 900
                    item.h = 600
                })
                this.slide1 = response.data.message
            }else {
                this.$toast('图片缩略图加载失败')
            }
        })
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>
<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;

  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }

  .subtitle {
    display: flex;
    font-size: 13px;
    justify-content: space-between;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
.preview-wrap img {
    width: 300px;
    height: 200px;
}
</style>

