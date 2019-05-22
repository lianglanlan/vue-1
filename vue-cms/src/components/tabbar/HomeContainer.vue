<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.url" alt>
      </mt-swipe-item>
    </mt-swipe>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
            <img src="../../images/menu1.png" alt="">
            <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
            <img src="../../images/menu2.png" alt="">
            <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
            <img src="../../images/menu3.png" alt="">
            <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
            <img src="../../images/menu4.png" alt="">
            <div class="mui-media-body">location</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
            <img src="../../images/menu5.png" alt="">
            <div class="mui-media-body">Search</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
            <img src="../../images/menu6.png" alt="">
            <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lunbotuList: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.$http
        .get("https://jsonplaceholder.typicode.com/photos?_page=1&_limit=3")
        .then(result => {
          if (result.body.length) {
            //请求成功
            this.lunbotuList = result.body;
          } else {
            //失败
            this.$toast("获取加载轮播图失败");
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.mint-swipe {
    height: 200px;

    img {
        width: 100%;
        height: 100%;
    }
}

.mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: 0;

    img {
        width: 60px;
    }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
}

.mui-media-body {
    font-size: 13px;
}
</style>