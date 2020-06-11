<template>
  <div class="rank-wrapper">
    <!-- hader -->
    <HaderTop />
    <!-- hader  end -->
    <div class="rank-box"></div>
    <div class="rank-section" v-show="maleRank.length">
      <h4>男生</h4>
      <div
        class="rank-item"
        v-for="(item, index) in maleRank"
        :key="index"
        @click="goRankDetail(item)"
      >
        <img :src="url+item.cover" alt />
        <span>{{item.title}}</span>
      </div>
    </div>
    <div class="rank-section" v-show="femaleRank.length">
      <h4>女生</h4>
      <div
        class="rank-item"
        v-for="(item, index) in femaleRank"
        :key="index"
        @click="goRankDetail(item)"
      >
        <img :src="url+item.cover" alt />
        <span>{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { rankCategory } from "../api/api";
import HaderTop from "@/components/hader/HaderTop.vue";
export default {
  data() {
    return {
      url: "http://statics.zhuishushenqi.com/",
      femaleRank: [],
      maleRank: []
    };
  },
  created() {
    this.getRanking();
  },
  methods: {
    getRanking() {
      rankCategory().then(res => {
        if (res.data.ok) {
          this.femaleRank = res.data.female.slice(0, 6);
          this.maleRank = res.data.male.slice(0, 6);
        }
      });
    },
    goRankDetail(item) {
      this.$router.push({
        path: "/rank/" + item._id,
        query: { title: item.title }
      });
      this.setRank(item);
    },
    ...mapMutations({
      setRank: "SET_RANK"
    })
  },
  components: {
    HaderTop
  }
};
</script>

<style scoped lang="scss">
.rank-wrapper {
  .rank-box{
    padding: 2.75rem;
  }
  .rank-section {
    h4 {
      line-height: 38px;
      padding: 0 20px;
      color: #666;
      font-weight: normal;
    }

    .rank-item {
      display: flex;
      height: 55px;
      align-items: center;
      padding-left: 15px;

      img {
        width: 35px;
        height: 35px;
      }

      span {
        flex: 1;
        margin-left: 15px;
        line-height: 15px;
        font-size: 16px;
        border-bottom: 1px solid #f5f5f5;
        padding: 20px 0;
        box-sizing: content-box;
      }
    }
  }
}
</style>