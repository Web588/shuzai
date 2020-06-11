<template>
  <div>
    <div class="books_box">
      <h4 class="title">
        男生最爱
        <i class="tip"></i>
      </h4>
      <div class="book-list">
        <BookList v-for="book in maleList" :book="book" :key="book._id" :home="home"></BookList>
      </div>
      <div class="more" @click="more()">
        <span>查看更多</span>
        <van-icon name="arrow" class="icon" />
      </div>
    </div>
    <div class="books_box">
      <h4 class="title">
        女生最爱
        <i class="tip"></i>
      </h4>
      <div class="book-list">
        <BookList v-for="book in femaleList" :book="book" :key="book._id" :home="home"></BookList>
      </div>
      <div class="more" @click="more()">
        <span>查看更多</span>
        <van-icon name="arrow" class="icon" />
      </div>
    </div>
  </div>
</template>
<script>
import { rank } from "../../api/api";
import BookList from "@/components/book/book-list.vue";
export default {
  data() {
    return {
      maleList: [],
      femaleList: [],
      home: true,
    };
  },
  methods: {
    more() {
      this.$router.push({
        path:"/rank"
      });
    }
  },
  mounted() {
    rank("54d42d92321052167dfb75e3").then(res => {
      // console.log("book---成功！！！", res.data.ranking.books);
      this.maleList = res.data.ranking.books.slice(0, 6);

      for (let i = 0; i < this.maleList.length; i++) {
        this.maleList[i].cover = unescape(this.maleList[i].cover).replace(
          "/agent/",
          ""
        );
      }
    });
    rank("54d43437d47d13ff21cad58b").then(res => {
      // console.log("book---成功！！！", res.data.ranking.books);
      this.femaleList = res.data.ranking.books.slice(0, 6);

      for (let i = 0; i < this.femaleList.length; i++) {
        this.femaleList[i].cover = unescape(this.femaleList[i].cover).replace(
          "/agent/",
          ""
        );
      }
    });
  },
  components: {
    BookList
  }
};
</script>
<style lang="scss" scoped>
.books_box {
  border-bottom: .3125rem solid #ddd;
}
.title {
  position: relative;
  width: 100%;
  height: 1.2rem;
  padding: 0 0.625rem;
  line-height: 1.2rem;
  font-size: 14px;
  overflow: hidden;
  text-align: left;
  margin-top: 0.5625rem;

  .tip {
    position: absolute;
    left: 0;
    top: 0.22rem;
    width: 0.15rem;
    height: 0.8rem;
    background-color: #b93321;
  }
}
.more {
  display: -ms-flexbox;
  display: flex;
  height: 2.2rem;
  margin: 0 0.625rem;
  color: #b93321;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: top;
  border-top: 1px solid #ddd;

  span {
    width: auto;
    display: inline-block;
    vertical-align: middle;
  }
  .icon {
    width: 0.34667rem;
    height: 1.34667rem;
    max-width: 12px;
    max-height: 12px;
    display: inline-block;
    vertical-align: middle;
    background-size: contain;
  }
}

</style>