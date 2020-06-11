<template>
  <div class="bookLists">
    <!-- haerder -->
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
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
    </div>
    <div class="load-more" ref="load">
      <div class="book-list">
        <BookList
          :book="book"
          v-for="(book,index) in bookLists"
          :key="index"
          :ranks="ranks"
          :isLoadMore="isLoadMore"
        ></BookList>
        <div class="loading-container" v-show="!bookLists.length">
          <div style="text-align: center;margin-top: 10px;">没有找到更多书籍</div>
        </div>
      </div>
    </div> 
    <Stick/>  
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import BookList from "@/components/book/book-list.vue";
import Stick from "@/components/Stick.vue";
import { rank } from "../../api/api";
export default {
  data() {
    return {
      largeTypeIndex: 0,
      title: "",
      largeTypes: [
        {
          name: "周榜",
          type: "week"
        },
        {
          name: "月榜",
          type: "month"
        },
        {
          name: "总榜",
          type: "total"
        }
      ],
      bookLists: [],
      allLoaded: false,
      monthRank: "",
      totalRank: "",
      weekRank: "",
      currentLoadPage: 1,
      type: "week",
      ranks: true,
      isLoadMore: false
    };
  },
  computed: {
    ...mapGetters(["rank"])
  },
  methods: {
    setLargeType(type, index) {
      this.bookLists = [];
      this.currentLoadPage = 1;
      this.largeTypeIndex = index;
      this.type = type;
      this.allLoaded = false;
      this._getBookLists(type);
    },
    _getBookLists(url) {
      if (!this.rank.weekRank) {
        rank(this.$route.params.id).then(res => {
          this.weekRank = res.data.ranking.id;
          this.monthRank = res.data.ranking.monthRank;
          this.totalRank = res.data.ranking.totalRank;
          this.title = res.data.ranking.title;
        });
      } else {
        //从排行榜列表也点击进去排行榜详情记录id的值
        this.weekRank = this.rank.weekRank;
        this.monthRank = this.rank.monthRank;
        this.totalRank = this.rank.totalRank;
      }
      if (!url) {
        //判断是否传参，如果没有传参那证明是用户在当前页面刷新，即把$route.params.id传给下面
        url = this.$route.params.id;
      } else {
        //有传参那么证明是用户单击tab切换，直接把上面记录的值赋值给url
        url = this[url + "Rank"];
      }
      rank(url).then(res => {
        if (res.data.ok) {
          this.bookLists = res.data.ranking.books.slice(0, 20);
          for (let i = 0; i < this.bookLists.length; i++) {
            this.bookLists[i].cover = unescape(this.bookLists[i].cover).replace(
              "/agent/",
              ""
            );
          }
        } else {
          this.bookLists = [];
        }
      });
    },
    _unEscape(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].cover = unescape(arr[i].cover);
        arr[i].cover = arr[i].cover.replace("/agent/", "");
      }
      return arr;
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
    next(vm => {
      vm.title = vm.$route.query.title;
      vm.largeTypeIndex = 0;
      vm._getBookLists(vm.type);
    });
  }
};
</script>
<style scoped lang="scss">
.bookLists {
  .select {
    position: fixed;
    top:44px;
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
    text-align: center;
    flex: 1;
    line-height: 40px;
    padding: 0 10px;
    font-size: 16px;
  }

  .book-list {
    width: 100%;
    background: #fff;
  }

  .load-more {
    padding-top: 5.5rem;
    overflow-y: scroll;
    box-sizing: border-box;
  }

  .active {
    color: #409eff;
    border-bottom: 1px solid #409eff; /* no */
  }
}
</style>

<style lang="scss" scoped>
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
  position: fixed;
  width: 100%;
  min-width: 20rem;
  max-width: 40rem;
  background: #409eff;
}
.van-nav-bar__left {
  .van-icon {
    color: #fff;
  }
}

.van-nav-bar__text {
  color: #fff;
}
</style>