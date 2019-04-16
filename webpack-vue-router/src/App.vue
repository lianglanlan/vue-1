<template>
  <div>
    <h1>这是App组件</h1>

    <mybtn type="danger">123</mybtn>

    <button type="button" class="mui-btn mui-btn-royal">紫色</button> 

    <router-link to="/account">account</router-link>
    <router-link to="/goodslist">goodslist</router-link>

    <router-view></router-view>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {};
  },
  methods: {
    show() {
      Toast({
          message: '这是消息',
          duration: -1,
          position: top,
          iconClass: 'glyphicon glyphicon-heart',
          className: 'mytoast'
      });
    }
  }
}
</script>
<style>
</style>

