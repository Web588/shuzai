<template>
  <div>
    <!-- hader -->
    <HaderTop />
    <!-- hader  end -->
    <!-- loop -->
    <Loop />
    <!-- loop  end -->
    <!-- search -->
    <Seach/>
    <!-- search  end -->
    <!-- book -->
    <Books />
    <!-- book  end -->
    <!-- footer -->
    <Footer />
    <!-- footer  end -->
    <Stick />
  </div>
</template>
<script>
import HaderTop from "@/components/hader/HaderTop.vue";
import Seach from "@/components/Seach.vue";
import Loop from "@/components/hader/Loop.vue";
import Books from "@/components/book/Books.vue";
import Footer from "@/components/Footer.vue";
import Stick from "@/components/Stick.vue";

export default {
  data() {
    return {
      list: ""
    };
  },
  created() {},
  components: {
    HaderTop,
    Seach,
    Loop,
    Books,
    Footer,
    Stick
  }
};
</script>


