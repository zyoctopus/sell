<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue'
export default {
  data() {
    return {
      seller: ''
    }
  },
  created() {
    this.$http.get('/api/seller').then((res) => {
      if (res.body.errno === 0) {
        this.seller = res.body.data
      }
    })
  },
  components: {
    vHeader: header
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  @import './common/less/mixin.less';
  .tab{
    display: flex;
    height: 40px;
    line-height: 40px;
    // self-defining function
    .border-1px(rgba(7, 17 ,27 , .1));
    // border-bottom: 1px solid rgba(7, 17 ,27 , .1);
    .tab-item{
      flex:1;
      text-align: center;
      & > a{
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active{
          color: rgb(240, 20, 20);
        }
      }
    }
  }
</style>
