<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="supType[seller.supports[0].type]"></span>
          <span class="desc">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports-count" v-if="seller.supports" @click="detailShow">
        <span class="text">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="detailShow">
      <span class="title"></span
      ><span class="text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="isShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="seller-name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star> 
            </div>
            <div class="little-title">
              <div class="line"></div>
              <div class="title">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support_item" v-for="item in seller.supports">
                <span class="icon" :class="supType[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="little-title">
              <div class="line"></div>
              <div class="title">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="seller-bulletin">
              <div class="text">{{seller.bulletin}}</div>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="detailHide"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import star from '../star/star.vue'
  export default {
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      detailShow() {
        this.isShow = true
      },
      detailHide() {
        this.isShow = false
      }
    },
    props: ['seller'],
    created() {
      this.supType = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      star
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/less/img.less';
  .header{
    color: rgb(255, 255, 255);
    background-color: rgba(7, 17, 27, .5);
    position: relative;
    overflow: hidden;
    .content-wrapper{
      padding: 24px 12px 18px 24px;
      position: relative;
      font-size: 0;
      .avatar{
        display: inline-block;
        vertical-align: top;
        margin-right: 16px;
      }
      .content{
        display: inline-block;
        .title{
          margin-bottom: 8px;
          padding-top: 2px;
          .brand{
            display: inline-block;
            vertical-align: top;
            width: 30px;
            height: 18px;
            .background-img("../img/brand@2x.png", "../img/brand@3x.png");
            background-repeat: no-repeat;
            background-size: 30px 18px;
          }
          .name{
            font-size: 16px;
            font-weight: bold;
            line-height: 18px;
            margin-left: 6px;
          }
        }
        .description{
          margin-bottom: 10px;
          font-size: 12px;
          line-height: 12px;
        }
        .supports{
          .icon{
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
          &.decrease{
            .background-img("../img/decrease_1@2x.png", "../img/decrease_1@3x.png");
            }
          &.discount{
            .background-img("../img/discount_1@2x.png", "../img/discount_1@3x.png");
            }
          &.special{
            .background-img("../img/special_1@2x.png", "../img/special_1@3x.png");
            }
          &.invoice{
            .background-img("../img/invoice_1@2x.png", "../img/invoice_1@3x.png");
            }
          &.guarantee{
            .background-img("../img/guarantee_1@2x.png", "../img/guarantee_1@3x.png");
            }

          }
          .desc{
            font-size: 10px;
            line-height: 12px;
          }
        }
      }
      .supports-count{
        position: absolute;
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        right: 12px;
        bottom: 14px;
        background-color: rgba(0, 0, 0, .2);
        border-radius: 14px;
        .text{
          vertical-align: top;
          font-size: 10px;
        }
        .icon-keyboard_arrow_right{
          margin-left: 2px;
          line-height: 24px;
          font-size: 10px;
        }
      }   
    }
    .bulletin-wrapper{
      position: relative;
      height: 28px;
      padding: 0 28px 0 12px;
      line-height: 28px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: rgba(7, 17, 27, .2);
      .title{
        display: inline-block;
        width: 22px;
        height: 12px;
        background-size: 22px 12px;
        .background-img("../img/bulletin@2x.png", "../img/bulletin@3x.png");
      }
      .text{
        vertical-align: top;
        font-size: 10px;
        margin-left: 4px;
      }
      .icon-keyboard_arrow_right{
        position: absolute;
        right: 12px;
        top: 9px;
        font-size: 10px;
      }
    }
    .background{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: -1;
      filter: blur(10px);
    }
    .detail{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(7, 17, 27, .8);
      z-index: 100;
      transition: all 0.5s;
      &.fade-enter, &.fade-leave-active{
        opacity: 0;
        background-color: rgba(7, 17, 27, 0);
      }
      .detail-wrapper{
        min-height: 100%;
        width: 100%;
        .detail-main{
          padding-top: 64px;
          padding-bottom: 64px;
          .seller-name{
            font-size: 16px;
            text-align: center;
            font-weight: 700;
            line-height: 16px;
          }
          .star-wrapper{
            padding: 16px 0 28px 0;
            text-align: center;
          }
          .little-title{
            display: flex;
            width: 80%;
            margin: 0 auto;
            padding-bottom: 24px;
            .line{
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255, 255, 255, .2);
            }
            .title{
              padding: 0 12px;
              font-size: 14px;
              line-height: 14px;
              font-weight: 700;
            }
          }
          .supports{
            box-sizing: border-box;
            width: 80%;
            margin: 0 auto 28px auto;
            padding: 0 12px;
            .support_item{
              font-size: 0;
              height: 16px;
              line-height: 16px;
              margin-bottom: 12px;
              .icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                vertical-align: top;
                margin-right: 6px;
                &.decrease{
                  .background-img("../img/decrease_2@2x.png", "../img/decrease_2@3x.png");
                }
                &.discount{
                  .background-img("../img/discount_2@2x.png", "../img/discount_2@3x.png");
                }
                &.special{
                  .background-img("../img/special_2@2x.png", "../img/special_2@3x.png");
                }
                &.invoice{
                  .background-img("../img/invoice_2@2x.png", "../img/invoice_2@3x.png");
                }
                &.guarantee{
                  .background-img("../img/guarantee_2@2x.png", "../img/guarantee_2@3x.png");
                }
              }
              .text{
                font-size: 12px;
              }
            }
          }
          .seller-bulletin{
            width: 80%;
            margin: 0 auto;
            .text{
              padding: 0 12px;
              font-size: 12px;
              line-height: 24px;
            }
          }
        }
      }
      .detail-close{
        height: 64px;
        margin-top: -64px;
        text-align: center;
        .icon-close{
          font-size: 32px;
        }
      }
    }
  }
</style>
