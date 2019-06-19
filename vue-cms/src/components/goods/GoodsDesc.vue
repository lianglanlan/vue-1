<template>
  <div class="goodsdesc-container">
    <h3>{{info.title}}</h3>
    <hr>
    <div class="content">{{info.content}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {}
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http
        .get("goods/getdesc", { params: { id: this.id } })
        .then(response => {
          if (response.status == 200) {
            this.info = response.data.message[0];
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.goodsdesc-container {
    h3 {
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
}
</style>
