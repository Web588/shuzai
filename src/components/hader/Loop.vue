<template>
  <div style="padding-top:88px;">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in list" :key="index">
        <van-image width="100%" height="140px" :src="item.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          pic: require('../../assets/images/1.jpg')
        },
        {
          pic: require('../../assets/images/2.jpg')
        },
        {
         pic: require('../../assets/images/3.jpg')
        },
        {
          pic: require('../../assets/images/4.jpg')
        },
        {
          pic: require('../../assets/images/5.jpg')
        },

        {
          pic: require('../../assets/images/6.jpg')
        },

        {
          pic: require('../../assets/images/7.jpg')
        },

        {
          pic: require('../../assets/images/8.jpg')
        },

        {
          pic: require('../../assets/images/9.jpg')
        },
        {
         pic: require('../../assets/images/10.jpg')
        },

        {
          pic: require('../../assets/images/11.jpg')
        },
        {
          pic: require('../../assets/images/12.jpg')
        }
      ]
    };
  }
};
</script>