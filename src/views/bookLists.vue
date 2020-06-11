<template>
  <div class="bookLists">
    <!-- haerder -->
    <van-nav-bar title="主题书单" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- haerder   end -->
    <div class="select">
      <ul class="select-bar">
        <li
          v-for="(item,index) in largeTypes"
          :key="index"
          :class="{'active':index===largeTypeIndex}"
          @click="setLargeType(item.type,index,item.duration)"
        >{{item.name}}</li>
      </ul>
      <ul class="select-bar">
        <li
          v-for="(item,index) in smallTypes"
          :key="index"
          :class="{'active':index===smallTypeIndex}"
          @click="setSmallType(item.minor,index)"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="book-list">
      <BookList
        :book="book"
        v-for="book in bookLists"
        :key="book._id"
        :isBookList="isBookList"
        :isLoadMore="isLoadMore"
      ></BookList>
    </div>
    <Stick/>
    <router-view></router-view>
  </div>
</template>
<script>
import { bookLists } from "../api/api";
import BookList from "@/components/book/book-list.vue";
import Stick from "@/components/Stick.vue";
export default {
  data() {
    return {
      largeTypeIndex: 0,
      smallTypeIndex: 0,
      type: "collectorCount",
      duration: "last-seven-days",
      minor: "",
      gender: "",
      start: 0,
      currentPage: 1,
      largeTypes: [
        {
          type: "collectorCount",
          name: "本周最热",
          duration: "last-seven-days"
        },
        {
          type: "created",
          name: "最新发布",
          duration: "all"
        },
        {
          type: "collectorCount",
          name: "最多收藏",
          duration: "all"
        }
      ],
      smallTypes: [
        {
          minor: "",
          name: "全部"
        },
        {
          minor: "male",
          name: "男生"
        },
        {
          minor: "female",
          name: "女生"
        }
      ],
      bookLists: [],
      allLoaded: false,
      isBookList: true,
      isLoadMore: false
    };
  },
  created() {
    this.getBookLists(this.type, this.duration, this.start, this.gender);
  },
  methods: {
    setLargeType(type, index, duration) {
      this.largeTypeIndex = index;
      this.type = type;
      this.duration = duration;
      this.getBookLists(this.type, this.duration, this.start, this.gender);
    },
    setSmallType(minor, index) {
      this.smallTypeIndex = index;
      this.minor = minor;
      this.gender = "&gender=" + minor;
      this.currentPage = 1;
      this.getBookLists(this.type, this.duration, this.start, this.gender);
    },

    getBookLists(type, dur, start, gender) {
      bookLists(type, dur, start, gender).then(res => {
        // console.log("getBookLists---成功！！！", res.data.bookLists);
        this.bookLists = res.data.bookLists;

        for (let i = 0; i < this.bookLists.length; i++) {
          this.bookLists[i].cover = unescape(this.bookLists[i].cover).replace(
            "/agent/",
            ""
          );
        }
      });
      
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  components: {
    BookList,
    Stick
  }
};
</script>
<style scoped lang="scss">
.bookLists {
  .van-nav-bar {
    position: relative;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background-color: #409eff;
    -webkit-user-select: none;
    user-select: none;
  }
  .van-nav-bar__text:active {
    background-color: transparent;
  }
  .van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    color: #fff;
    font-weight: 500;
    font-size: 16px;
  }
  .van-icon {
    color: #fff;
    vertical-align: middle;
  }
  .van-nav-bar__text {
    display: inline-block;
    margin: 0 -16px;
    padding: 0 16px;
    color: #fff;
    vertical-align: middle;
  }
  .select {
    background: #fff;
    z-index: 10;
    width: 100%;
  }
  .select-bar {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
    height: 40px;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    border-bottom: 1px solid #f2f2f2;
  }
  .select-bar li {
    flex-shrink: 0;
    line-height: 40px;
    padding: 0 20px;
    font-size: 16px;
  }
  .active {
    color: red;
  }
  .book-list {
    width: 100%;
    background: #fff;
  }
  .load-more {
    padding-top: 300px;
    overflow-y: scroll;
    height: 100vh;
    box-sizing: border-box;
  }

  .active {
    color: #409eff;
  }
}
</style>