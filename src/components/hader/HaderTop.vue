/* eslint-disable no-undef */
<template>
  <div class="hader" v-show="showactiove">
    <div class="hader-left">
      <div class="logo"></div>
    </div>
    <div class="hader-center"></div>
    <div class="hader-right">
      <svg class="icon" aria-hidden="true" @click="bookrack()">
        <use xlink:href="#icon-icon_shujia" />
      </svg>
      <p>书架</p>
    </div>
    <div class="header-tab">
      <router-link tag="a" class="tab-item" to="/home">首页</router-link>
      <router-link tag="a" class="tab-item" to="/categories">分类</router-link>
      <router-link tag="a" class="tab-item" to="/rank">排行</router-link>
      <router-link tag="a" class="tab-item" to="/bookLists">书单</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "HaderTop",
  props: {
    msg: String
  },
  data() {
    return {
      showactiove: true
    };
  },
  watch: {
    "$route.path": function(newValue, oldValue) {
      if (
        newValue == "/search" ||
        newValue == "/bookrack" ||
        newValue == "/bookdetails" ||
        newValue == "/bookLists" ||
        newValue == "/categories/detail" ||
        newValue == "/bookLists/:id"

      ) {
        this.showactiove = false;
      } else {
        this.showactiove = true;
      }
      window.console.log(newValue);
      // 修改vuex里面跳转路径
      this.$store.state.oldurl = oldValue;
    }
  },
  methods: {
    bookrack() {
      this.$router.push({ path: "/mybooks" });
    },
    onClick(name, title) {
      this.$toast(title);
    }
  }
};
</script>
<style scoped lang="scss">
.header-tab {
  width: 100%;
  min-width: 20rem;
  max-width: 40rem;
  display: flex;
  .tab-item {
    flex: 1;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    line-height: 2.5rem;
    background: #409eff;
    color: #d6d6d6;
  }

  .router-link-active {
    color: #fff;
  }
}

.logo {
  background-image: url(../../assets/logo.png);
  background-size: 65% 65%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
  display: block;
}
.tab1 {
  border-top-left-radius: 1.5625rem;
  border-bottom-left-radius: 1.5625rem;
}
.tab2 {
  border-top-right-radius: 1.5625rem;
  border-bottom-right-radius: 1.5625rem;
}

.van-tabbar--fixed {
  position: absolute;
  top: 49%;
  margin-top: -1.1875rem;
}
.van-tabbar-item--active {
  color: #ffffff;
  background: #ffffff;
}
.van-tabbar {
  height: 2.25rem;
  line-height: 1.8rem;
  border-radius: 1.5625rem;
  background: #ffffff;
  border: 0.0625rem solid #ffffff;
}
.van-tabbar-item {
  height: 2.25rem;
  line-height: 1.8rem;
  display: block;
  font-size: 0.875rem;
}
.hader {
  padding: 0;
  margin: 0 auto;
  border: 0;
  width: 100%;
  min-width: 20rem;
  max-width: 40rem;
  height: 3rem;
  line-height: 3rem;
  background: #ffffff;
  color: #fff;
  position: fixed;
  z-index: 99;
}
.hader-left {
  width: 25%;
  height: 3rem;
  line-height: 3rem;
  float: left;
}
.hader-center {
  width: 50%;
  height: 3rem;
  line-height: 3rem;
  float: left;

  .tab {
    width: 6.25rem;
    height: 2.375rem;
    line-height: 2.375rem;
    background: #ffffff;
    margin: 5px auto;
    border-radius: 1.5625rem;
    position: relative;
  }
}
.hader-right {
  width: 25%;
  height: 3rem;
  line-height: 3rem;
  float: right;
  color: #409eff;
  position: relative;

  .icon {
    width: 60%;
    height: 3rem;
    line-height: 3rem;
    transform: scale(0.6);
    color: #409eff;
  }
  p {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 10px;
  }
}
</style>