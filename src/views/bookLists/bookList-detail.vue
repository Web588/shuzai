
<template>
  <div class="booklist-item">
    <!-- haerder -->
    <van-nav-bar title="书单详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- haerder   end -->
    <Stick/>
    <div class="author" v-show="author.nickname">
      <div class="author-top">
        <img :src="img+author.avatar" alt />
        <div class="top-right">
          <div class="name">{{author.nickname}}</div>
          <div class="lastTime">{{upDate = 0 ? '刚刚更新' : `${upDate}`}}小时前更新</div>
        </div>
      </div>
      <div class="author-des">
        <h1>{{title}}</h1>
        <div class="desc">{{desc}}</div>
      </div>
    </div>
    <div class="item" v-show="booklist.length>0">
      <ul>
        <li @click="goBooks(item.book._id)" v-for="(item, index) in booklist" :key="index">
          <div class="book-info">
            <div class="img">
              <img :src="imgEscpe(item.book.cover)" alt />
            </div>
            <div class="book-right">
              <h1>{{item.book.title}}</h1>
              <div class="book-data">
                <span>{{item.book.author}}</span> |
                <span>{{item.book.cat}}</span> |
                <span class="c-rq">{{latelyFollower(item.book.latelyFollower)}}</span>万人气
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { bookListsInfo } from "../../api/api";
import Stick from "@/components/Stick.vue";
export default {
  data() {
    return {
      booklist: [],
      title: "",
      desc: "",
      author: {},
      img: "http://statics.zhuishushenqi.com",
      upDate: ""
    };
  },
  created() {
    this.getBooksList(this.$route.params.id);
  },
  methods: {
    latelyFollower(lately) {
      return (lately / 10000).toFixed(1);
    },
    imgEscpe(url) {
      return unescape(url.replace("/agent/", ""));
    },
    goBooks(id) {
      this.$router.push({
        path: "/book/" + id
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    getBooksList(id) {
      bookListsInfo(id).then(res => {
        this.upDate = this._time(res.data.bookList.updated);
        this.author = res.data.bookList.author;
        this.desc = res.data.bookList.desc;
        this.title = res.data.bookList.title;
        this.booklist = res.data.bookList.books;
      });
    },
    _unEscape(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].cover = unescape(arr[i].cover);
        arr[i].cover = arr[i].cover.replace("/agent/", "");
      }
      return arr;
    },
    _time(time) {
      let currentTime = Math.round(new Date() / 1000);
      this.upDate = time.replace("T", " ").replace("Z", " ");
      this.upDate = Date.parse(new Date(this.upDate)) / 1000;
      return Math.floor(((currentTime - this.upDate) % 86400) / 3600);
    }
  },
  components: {
    Stick
  }
};
</script>
<style scoped lang="scss">
.booklist-item {
  width: 100%;
  z-index: 100;
  background: #fff;
  overflow-y: scroll;
  max-width: 40rem; /* no */
  margin: 0 auto;

  .book-header {
    height: 100px;
    line-height: 100px;
    font-size: 25px;
    background: #409eff;
    width: 100%;
  }

  .author {
    padding: 5px;
    position: relative;
    box-sizing: border-box;
    border-bottom: 1px solid #ebebeb; /* no */

    .author-top {
      height: 65px;

      img {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 6px;
        top: 6px;
      }

      .top-right {
        margin-left: 65px;

        .name {
          margin-bottom: 10px;
        }
      }
    }

    .author-des {
      h1 {
        line-height: 18px;
        height: 18px;
        font-size: 16px;
      }

      .desc {
        line-height: 40px;
        color: #999;
      }
    }
  }

  .item {
    li {
      height: 102px;
      border: 1px solid #ebebeb;
    }
    .book-info {
      padding: 10px;
      display: flex;
      box-sizing: border-box;

      .img {
        width: 3.75rem;
        height: 5rem;
        margin-right: 10px;
        overflow: hidden;
        // background: url('../assets/images/default.jpg') no-repeat;
        background-position: 50%;
        background-size: 100%;

        img {
          max-width: 100%;
        }
      }

      .book-right {
        flex: 1;
        h1 {
          line-height: 40px;
          height: 40px;
          font-size: 16px;
        }

        .book-data {
          color: #999;
          font-size: 0.875rem;
        }

        .c-rq {
          color: red;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.van-nav-bar {
  position: relative;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background: #409eff;
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
.van-nav-bar__left {
  left: 2px;
  .van-icon {
    color: #fff;
    vertical-align: middle;
  }
}
.van-nav-bar__text {
  display: inline-block;
  margin: 0 -16px;
  padding: 0 16px;
  color: #fff;
  vertical-align: middle;
}
</style>