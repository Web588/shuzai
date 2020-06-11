<template>
  <div style="position: relative;height: 75px; border-bottom: 5px solid #eeeeee;">
    <div class="nav">
      <svg class="icon nav-box" aria-hidden="true" @click="bookrack()">
        <use xlink:href="#icon-shu" />
      </svg>
      <svg class="icon nav-box" aria-hidden="true" @click="ranking()">
        <use xlink:href="#icon-bianpinghuatubiaosheji-" />
      </svg>
      <svg class="icon nav-box" aria-hidden="true" @click="VIP()">
        <use xlink:href="#icon-VIP" />
      </svg>
      <svg class="icon nav-box" aria-hidden="true" @click="recharge()">
        <use xlink:href="#icon-chongzhi" />
      </svg>
    </div>
    <div class="nav-text">
      <ul>
        <li>书架</li>
        <li>排行</li>
        <li>VIP</li>
        <li>充值</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
    bookrack(){
      this.$router.push({ path: "/bookrack" });
    },
    ranking(){
      this.$router.push({ path: "/ranking" });
    },
    VIP(){
        this.$router.push({ path: "/vip" });
    },
    recharge(){
        this.$router.push({ path: "/recharge" });
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  min-width: 20rem;
  max-width: 40rem;
  height: 3rem;
  padding: 0 0.3125rem;
  display: flex;
  box-sizing: border-box;
}
.nav-box {
  flex: 1;
  transform: scale(0.7);

  .iconfont {
    font-size: 1.25rem;
  }
  h3 {
    margin: 0;
  }
}
.nav-text {
  width: 100%;
  min-width: 20rem;
  max-width: 40rem;
  padding: 0 0.3125rem;
  box-sizing: border-box;
  position: absolute;
  bottom: .6rem;
  ul {
    display: flex;
    li {
      flex: 1;
      display: inline-block;
      text-align: center;
      font-size: .875rem;
    }
  }
}
</style>