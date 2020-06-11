<template>
  <div>
    <!-- haerder -->
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- haerder   end -->
    <div class="load-more" ref="load">
      <div class="book-list">
        <BookList
          :book="book"
          v-for="(book) in bookLists"
          :key="book._id"
          :isSearch="isSearch"
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
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import BookList from "@/components/book/book-list.vue";
import Stick from "@/components/Stick.vue";
import { search } from "../api/api";
export default {
  data() {
    return {
      searchList: "",
      placeholder: "圣墟",
      title: "",
      bookLists: [],
      allLoaded: false,
      currentLoadPage: 1,
      isSearch: true,
      isLoadMore: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    goSearch() {
      if (!this.search) {
        this.$router.push({
          path: "/search",
          query: {
            val: this.placeholder
          }
        });
        this.setSearch(this.placeholder);
      } else {
        this.$router.push({
          path: "/search",
          query: {
            val: this.search
          }
        });
        this.setSearch(this.search);
      }
    },
    ...mapMutations({
      setSearch: "SET_SEARCH"
    }),
    _getBookLists(val) {
      search(val).then(res => {
        if (res.data.ok) {
          this.bookLists = res.data.books.slice(0, 20)
          if (
            this.bookLists <= 20 ||
            this.bookLists.length === res.data.books.length
          ) {
            this.allLoaded = true;
          }
        }
        for (let i = 0; i < this.bookLists.length; i++) {
          this.bookLists[i].cover = unescape(this.bookLists[i].cover).replace(
            "/agent/",
            ""
          );
        }
      });
    },
    loadBottom() {
      this.isLoadMore = true;
      search(this.$route.query.val).then(res => {
        if (res.data.ok) {
          if (
            this.bookLists <= 20 ||
            this.bookLists.length === res.data.books.length
          ) {
            this.allLoaded = true;
          }
          this.bookLists = this._unEscape(
            this.normalizeBooks(
              res.data.books.slice(0, this.currentLoadPage * 20 + 20)
            )
          );
          this.currentLoadPage++;
          setTimeout(() => {
            this.isLoadMore = false;
          }, 350);
        }
      });
      this.$refs.loadmore.onBottomLoaded();
    }
  },
  components: {
    BookList,
    Stick
  },
  computed: {
    ...mapGetters(["search"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.title = `跟"${vm.$route.query.val}"有关的书籍`;
      vm._getBookLists(vm.$route.query.val);
    });
  }
};
</script>

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
  background-color: #409eff;
}
.van-icon {
  color: #fff;
}
.van-nav-bar__text {
  color: #fff;
}
.van-nav-bar {
  width: 100%;
  min-width: 20rem;
  max-width: 40rem;
  margin: 0 auto;
  background: #409eff;
}
.van-nav-bar__text:active {
  background-color: transparent;
}
.van-search__action {
  width: 3.4375rem;
  color: #969799;
}
.van-search__content {
  border-radius: 20px;
}
.van-nav-bar__title.van-ellipsis {
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
}
.van-icon.van-icon-arrow-left {
  color: #ffffff;
}
.van-nav-bar__text {
  color: #ffffff;
}
</style>
