<template>
  <div class="search-box">
    <div class="swiper-container" @click="search()">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in list" :key="index">
          <div class="swtext">{{item}}</div>
        </div>
      </div>
      <div class="search">搜索</div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  data() {
    return {
      list: [
        "梦回大清",
        "绝色玄灵师：邪君的腹黑妃",
        "超级女婿",
        "大佬宠妻不腻",
        "重生之毒妃"
      ],
      showactiove: true
    };
  },
  watch: {
    "$route.path": function(newValue, oldValue) {
      if (newValue == "/search") {
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
    search() {
      this.$router.push({ path: "/search" });
    }
  },
  mounted() {
    new Swiper(".swiper-container", {
      direction: "vertical",
      slidesPerView: 1,
      spaceBetween: 1000,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.search-box {
  
  width: 100%;
  min-width: 20rem;
  max-width: 40rem;
  background: #fff;
}
.search {
  position: absolute;
  right: 0.625rem;
  bottom: 0.125rem;
}
.swiper-container {
  width: 95%;
  min-width: 19rem;
  max-width: 40rem;
  height: 2.1875rem;
  line-height: 2.1875rem;
  text-align: left;
  background: #dfdfdf;
  border: 5px solid #fff;
  border-radius: 0.9375rem;
  position: relative;
}
.swiper-wrapper {
  width: 12.25rem;
}
.swiper-slide {
  padding-left: 0.625rem;
}
.swtext {
  font-size: 0.75rem;
}
</style>