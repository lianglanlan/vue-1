<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" alt>
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>
                已勾选商品
                <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价
                <span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span>元
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from "../subcomponents/shopcar_numbox.vue";

export default {
  data() {
    return {
      goodslist: []
    };
  },
  components: {
    numbox
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      let { car } = this.$store.state;
      if (!car.length) return;
      let idArr = [];
      car.forEach(item => {
        idArr.push(item.id);
      });
      this.$http
        .get(
          "http://www.liulongbin.top:3005/api/goods/getshopcarlist/" +
            idArr.join(",")
        )
        .then(response => {
          if (response.data.status == 0) {
            this.goodslist = response.data.message;
          }
        });
    },
    remove(id, index) {
      //点击删除
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFromCar", id);
    },
    selectedChanged(id, selected) {
      this.$store.commit("updateSelected", { id, selected });
    }
  }
};
</script>
<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
}
.goods-list {
  img {
    width: 60px;
    height: 60px;
  }

  h1 {
    font-size: 13px;
  }

  .price {
    color: red;
    font-weight: bold;
  }
}
.mui-card-content-inner {
  display: flex;
  align-items: center;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    margin-bottom: 0;
  }
}
.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.red {
  color: red;
  font-weight: bold;
  font-size: 16px;
}
</style>