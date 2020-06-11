<template>
  <div class="book-item" @click="goBooks(book._id)">
    <div class="cover">
      <img :src="book.cover" alt />
    </div>
    <div class="item-txt">
      <h4 class="name">{{book.title}}</h4>
      <p class="author">{{book.author}}</p>
      <p class="desc">{{book.shortIntro}}</p>
      <p class="desc" v-show="isBookList">{{book.desc}}</p>
      <p class="cat" v-if="home">
        {{book.minorCate}}
        <span class="split">|</span>
        <span class="c-rq">{{latelyFollower}}</span>
        万人气
      </p>
      <p class="cat" v-if="cate||ranks|| isSearch">
        <span class="c-rq">{{latelyFollower}}</span>万人气
        <span class="split">|</span>
        <span class="c-rq">{{book.retentionRatio}}%</span>读者留存
      </p>
      <p class="cat" v-if="isBookList">
        共{{book.bookCount}}本书
        <span class="split">|</span>
        <span>{{collectorCount}}</span>
      </p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    book: {
      type: Object,
      default: null
    },
    home: {
      type: Boolean,
      default: false
    },
    cate: {
      type: Boolean,
      default: false
    },
    ranks: {
      type: Boolean,
      default: false
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    isBookList: {
      type: Boolean,
      default: false
    },
    isLoadMore: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    latelyFollower() {
      return (this.book.latelyFollower / 10000).toFixed(1);
    },
    collectorCount() {
      if (this.book.collectorCount) {
        if (this.book.collectorCount > 10000) {
          return (this.book.collectorCount / 10000).toFixed(1) + "万人收藏";
        } else {
          return this.book.collectorCount + "人收藏";
        }
      } else {
        return 0 + "人收藏";
      }
    }
  },

  created() {},
  methods: {
    goBooks(id) {
      if (this.isLoadMore) {
        return;
      }
      if (this.isBookList) {
        this.$router.push({
          path: "/bookLists/"+ id
        });
      } else {
        this.$router.push({
          path: "/book/"+ id
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.book-item {
  display: flex;
  padding: 8px;
  height: 80px;
  border-bottom: 1px solid #f5f5f5; /* no */

  &:last-child {
    border-bottom: none;
  }

  .cover {
    flex: 0 0 60px;
    margin-right: 10px;
    overflow: hidden;
    background: url("../../assets/images/default.jpg") no-repeat;
    background-position: 50%;
    background-size: 100%;

    img {
      width: 3.75rem;
      height: 5rem;
    }
  }

  .item-txt {
    flex: 1;
    width: 100%;
    overflow: hidden;

    .name {
      font-weight: 600;
      font-size: 14px; /* no */
      line-height: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    p {
      line-height: 20px;
      font-size: 0.875rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .desc,
    .author {
      color: #999;
    }

    .cat {
      color: #666;
      .split {
        margin-right: 0.25rem;
      }
    }

    .c-rq {
      color: red;
    }
  }
}
</style>
