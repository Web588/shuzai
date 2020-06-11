<template>
  <div>
    <!-- hader -->
    <HaderTop />
    <!-- hader  end -->
    <div class="category-wrapper">
      <div class="category-section" v-show="category.male.length">
        <h4>{{categoryType.male.name}}</h4>
        <div class="category-list">
          <div
            class="category-item"
            @click="goCategoryDetail(item,categoryType.male.type)"
            v-for="(item ,index) in category.male"
            :key="index"
          >
            <p class="name">{{item.name}}</p>
            <p class="count">{{item.bookCount}}</p>
          </div>
        </div>
      </div>
      <div class="category-section" v-show="category.female.length">
        <h4>{{categoryType.female.name}}</h4>
        <div class="category-list">
          <div
            class="category-item"
            @click="goCategoryDetail(item,categoryType.female.type)"
            v-for="(item ,key, index) in category.female"
            :key="index"
          >
            <p class="name">{{item.name}}</p>
            <p class="count">{{item.bookCount}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { categories } from "../api/api";
import HaderTop from "@/components/hader/HaderTop.vue";
export default {
  data() {
    return {
      category: {
        male: [],
        female: []
      },
      categoryType: {
        male: {
          name: "男生",
          type: "male"
        },
        female: {
          name: "女生",
          type: "female"
        }
      }
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      categories().then(res => {
        this.category.male = res.data.male;
        this.category.female = res.data.female;
      });
    },
    goCategoryDetail(item, key) {
      this.$router.push({
        path: "/categories/detail",
        query: { gender: key, major: item.name }
      });
    }
  },
  components: {
    HaderTop
  }
};
</script>

<style scoped lang="scss">
.category-wrapper {
  padding-top: 5.5rem;
  .category-section {
    h4 {
      line-height: 2.2rem;
      padding: 0 20px;
      color: #666;
      font-weight: normal;
    }

    .category-list {
      display: flex;
      width: 100%;
      flex-wrap: wrap;

      .category-item {
        flex: 1;
        width: 33.3333333%;
        max-width: 33.3333333%;
        min-width: 33.3333333%;
        text-align: center;
        padding: 0.3125rem;
        line-height: 16px;
        border-top: 1px solid #f8f8f8;
        border-right: 1px solid #f8f8f8;
        border-bottom: 1px solid #f8f8f8;
        box-sizing: border-box;

        &:nth-child(3n + 3) {
          border-right: none;
        }

        &:nth-child(n + 4) {
          margin-top: -1px; /* no */
        }

        .name {
          font-size: 0.8rem;
          font-weight: 500;
          color: #333;
        }

        .count {
          font-size: 12px;
          color: #ccc;
        }
      }
    }
  }
}
</style>