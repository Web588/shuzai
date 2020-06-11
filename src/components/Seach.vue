<template>
  <div>
    <div class="search">
      <div class="search-con">
        <input type="text" :placeholder="placeholder" class="input" v-model="search" />
      </div>
      <div class="search-btn" @click="goSearch()">
        <i class="fa fa-search"></i>搜索
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex';
export default {
  data() {
    return {
      search: "",
      placeholder: "圣墟"
    };
  },
  methods: {
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
    })
  }
};
</script>

<style lang="scss" scoped>
.search {
  padding: 6px;
  position: relative;
  .search-con {
    border: 1px solid #d6d6d6; /* no*/
    overflow: hidden;
    .input {
      line-height: 36px;
      padding: 0 10px;
      width: 100%;
      box-sizing: border-box;
      outline: none;
    }
  }
  .search-btn {
    position: absolute;
    right: 7px;
    top: 8px;
    width: 3.5rem;
    height:36px;
    background-color: #409eff;
    color: #fff;
    border: 1px solid #409eff;
    line-height: 36px;
    text-align: center;
  }
}
</style>
