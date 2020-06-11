<template>
  <div>
    <!-- 返回头部   strat -->
    <div class="scrollbox" @click="backTop()">
      <div class="scrollbox-item" v-if="btnFlag">
        <i class="iconfont icon-rising">个</i>
      </div>
    </div>
    <!-- 返回头部  end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnFlag: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  methods: {
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

// scrollbox  strat
.scrollbox {
  position: fixed;
  bottom: 12.14285714rem;
  right: 0.57142857rem;
  z-index: 10;

  .scrollbox-item {
    display: block;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background: #fff;
    -webkit-box-shadow: 0 0.28571429rem 0.42857143rem 0 #dee2e5;
    box-shadow: 0 0.28571429rem 0.42857143rem 0 #dee2e5;
    cursor: pointer;

    .iconfont {
      font-size: 0.42857143rem;
    }
  }
}

// scrollbox  end
</style>