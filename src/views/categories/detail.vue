<template>
  <div class="bookLists">
    <!-- haerder -->
    <van-nav-bar :title="major" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- haerder   end -->
    <div class="select">
      <ul class="select-bar">
        <li
          v-for="(item,index) in largeTypes"
          :key="index"
          :class="{'active':index===largeTypeIndex}"
          @click="setLargeType(item.type,index)"
        >{{item.name}}</li>
      </ul>
      <ul class="select-bar" v-show="mins.length>0">
        <li
          v-for="(minor,index) in mins"
          :key="index"
          :class="{'active':index===smallTypeIndex}"
          @click="setSmallType(minor,index)"
        >{{minor}}</li>
      </ul>
    </div>
    <BookList
      :book="book"
      v-for="(book,index) in bookLists"
      :key="index"
      :cate="cate"
      :isLoadMore="isLoadMore"
    >
      <div v-show="bookLists.length" style="margin-top: 10px; text-align: center">暂无数据</div>
    </BookList>
    <Stick />
  </div>
</template>
<script>
import Stick from "@/components/Stick.vue";
import BookList from "@/components/book/book-list.vue";
import { categoriesInfo, subCategories } from "../../api/api";
export default {
  data() {
    return {
      largeTypeIndex: 0,
      smallTypeIndex: 0,
      type: "hot",
      duration: "last-seven-days",
      major: "",
      minor: "",
      gender: "",
      start: 0,
      currentPage: 1,
      largeTypes: [
        {
          type: "hot",
          name: "热门"
        },
        {
          type: "new",
          name: "新书",
          duration: "all"
        },
        {
          type: "reputation",
          name: "好评"
        },
        {
          type: "over",
          name: "完结"
        },
        {
          type: "monthly",
          name: "包月"
        }
      ],
      mins: [],
      bookLists: [],
      allLoaded: false,
      cate: true,
      isLoadMore: false
    };
  },
  methods: {
    setLargeType(type, index) {
      this.largeTypeIndex = index;
      if (this.type === type) {
        return;
      }
      this.type = type;
      this.getBookLists(this.gender, this.type, this.major, this.minor);
    },
    setSmallType(minor, index) {
      this.smallTypeIndex = index;
      if (this.minor === minor) {
        return minor;
      }
      if (minor === "" || minor === "全部") {
        this.minor = "";
      } else {
        this.minor = minor;
      }
      this.currentPage = 1;

      this.getBookLists(this.gender, this.type, this.major, this.minor);
    },
    getBookLists(gender, type, major, minor = "", start = 0, limit = 60) {
      categoriesInfo(gender, type, major, minor, start, limit).then(res => {
        this.bookLists = res.data.books;
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
  },
  beforeRouteEnter(to, from, next) {
    /*获取大类中的小类*/
    next(vm => {
      vm.major = vm.$route.query.major;
      vm.gender = vm.$route.query.gender;
      subCategories().then(res => {
        res.data[vm.$route.query.gender].forEach(type => {
          if (type.major === vm.$route.query.major) {
            vm.mins = type.mins;
            if (type.mins.length > 0) {
              vm.mins.unshift("全部");
            }
          }
        });
      });
      vm.getBookLists(vm.$route.query.gender, vm.type, vm.$route.query.major);
    });
  }
};
</script>

<style scoped lang="scss">
.bookLists {
  .van-nav-bar__text:active {
    background-color: transparent;
  }
  .van-nav-bar__left {
    left: 2px;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar {
    background: #409eff;
  }
  .van-icon {
    color: #fff;
  }
  .van-nav-bar__text {
    color: #fff;
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
    height: 50px;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    border-bottom: 1px solid #f2f2f2;
  }

  .select-bar li {
    flex-shrink: 0;
    line-height: 50px;
    padding: 0 8px;
    font-size: 13px;
  }

  .active {
    color: red;
  }

  .book-list {
    width: 100%;
    background: #fff;
  }

  .load-more {
    overflow-y: scroll;
    height: 100vh;
    box-sizing: border-box;
  }

  .padding300 {
    padding-top: 300px;
  }

  .padding200 {
    padding-top: 200px;
  }

  .active {
    color: #409eff;
  }
}
</style>
