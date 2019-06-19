<template>
    <div class="goods-list">
        <router-link :to=" '/home/goodsinfo/' + item.id " class="goods-item" v-for="(item,index) in goodslist" :key="index">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </router-link>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data () {
        return {
            pageindex: 1,
            goodslist: []
        }
    },
    created() {
        this.getGoodlist()
    },
    methods: {
        getGoodlist() {
            this.$http.get('goods',{params:{pageindex: this.pageindex}}).then(response => {
                if(response.status === 200) {
                    this.goodslist = this.goodslist.concat(response.data.message)
                } else {
                    this.$toast('请求出错')
                }
            })
        },
        getMore() {
            this.pageindex ++
            this.getGoodlist()
        }
    } 
}
</script>
<style lang="scss" scoped>
.goods-list {
    padding: 7px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.goods-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 49%;
    margin: 3px 0;
    padding: 2px;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    min-height: 293px;

    img {
        width: 100%;
    }

    .title {
        font-size: 14px;
    }
}
.info {
    background-color: #eee;
    p {
        margin: 0;
        padding: 5px;
    }
    .price {
        .now {
            color: red;
            font-weight: bold;
            font-size: 16px;
        }

        .old {
            text-decoration: line-through;
            font-size: 12px;
            margin-left: 10px;
        }
    }

    .sell {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }
}
</style>

