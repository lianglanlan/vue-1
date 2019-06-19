<template>
  <div>
    <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a :class="['mui-control-item',item.id === 0 ? 'mui-active':'']" v-for="(item, index) in cates" :key="index" @click="getPhotoListByCateId(item.id)">
                    {{item.title}}
                </a>
            </div>
        </div>
        <!-- 图片列表区 -->
        <ul class="photo-list">
            <router-link v-for="(item,index) in list" :key="index" :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="title">{{item.title}}</h1>
                    <div class="body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
  </div>
</template>
<script>
//初始化滑动组件
import mui from "../../lib/mui/js/mui.min.js";


export default {
  data() {
    return {
        cates: [],
        list: []    //图片列表
    }
  },
  created() {
      this.getAllCategory()
      this.getPhotoListByCateId(0)
  },
  mounted(){
    mui(".mui-scroll-wrapper").scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  },
  methods: {
      getAllCategory(cateId){
          this.$http.get('getimgcategory').then(response => {
              if(response.status == 200){
                //   手动拼接完整列表
                  response.data.message.unshift({title:'全部',id:0})
                  this.cates = response.data.message
              }
          })
      },
      getPhotoListByCateId(cateid) {
          this.$http.get('getfdsafdsa',{params:{cateid,imgid:cateid}}).then(response => {
              if(response.status === 200) {
                  this.list = response.data.message
              }else {
                  this.$toast('图片信息获取失败')
              }
          })
      }
  }
};
</script>
<style lang="scss" scoped>
* {
    touch-action: pan-y;
}

.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;

    li {
        position: relative;
        margin-bottom: 10px;
        background-color: #ccc;
        box-shadow: 0 0 9px #ccc;
        border-radius: 3px;
        overflow: hidden;
    }

    img {
        display: block;
        width: 100%;
    }

    img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
    }

    .info {
        position: absolute;
        bottom: 0;
        max-height: 84px;
        color: white;
        text-align: left;
        background-color: rgba(0, 0, 0, 0.4);

        .title {
            font-size: 14px;
        }

        .body {
            font-size: 13px;
        }
    }
}

.mui-slider {
    z-index: 0;
}

</style>

