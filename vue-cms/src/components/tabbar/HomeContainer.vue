<template>
  <div>
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
            <img src="../../images/menu1.png" alt="">
            <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
            <img src="../../images/menu2.png" alt="">
            <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
            <img src="../../images/menu3.png" alt="">
            <div class="mui-media-body">商品购买</div>
        </router-link>
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
import swiper from '../subcomponents/swiper.vue'

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
        .then(response => {
          if (response.status === 200) {
            //请求成功
            this.lunbotuList = response.data;
          } else {
            //失败
            this.$toast("获取加载轮播图失败");
          }
        });
    }
  },
  components: {
    swiper
  }
};
</script>
<style lang="scss" scoped>
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