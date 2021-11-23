<template>
  <TopMenuBar />
  <div class="detail-wrapper" v-loading.fullscreen.lock="fullscreenLoading">
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="image-wrapper">
          <img :src="detailProduct.image" />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="info-wrapper">
          <h4>{{ detailProduct.name }}</h4>
          <p>${{ detailProduct.price }}</p>
          <p>
            Available:
            <span>{{
              detailProduct.isAvailable ? "In Stock" : "Not Available"
            }}</span>
          </p>
          <p>
            {{ detailProduct.description }}
          </p>
          <div class="payment-wrapper">
            <p>
              <el-icon>
                <ShoppingCart />
              </el-icon>
              <span>Free Shipping</span>
            </p>
            <p>
              <el-icon> <Money /> </el-icon><span>EMI options available</span>
            </p>
          </div>
        </div>
        <div class="action-wrapper">
          <el-button class="add-button" :icon="cartIcon">Add to cart</el-button>
          <el-button @click="onClickBack">Back</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TopMenuBar from "@/components/TopMenuBar";
import { ShoppingCart, Money } from "@element-plus/icons";

export default {
  name: "DetailProduct",
  components: {
    TopMenuBar,
    ShoppingCart,
    Money,
  },
  computed: {
    ...mapState(["detailProduct"]),
  },
  methods: {
    ...mapActions(["getDetailProduct"]),
    async fetchDetailProduct() {
      this.fullscreenLoading = true;
      await this.getDetailProduct(this.$route.params.id);
      this.fullscreenLoading = false;
    },
    onClickBack() {
      this.$router.push({ path: "/listproduct/" });
      this.$store.commit("setDetailProduct", {});
    },
  },
  data() {
    return {
      fullscreenLoading: false,
      cartIcon: ShoppingCart,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchDetailProduct();
    });
  },
};
</script>
<style lang="scss" scoped>
.detail-wrapper {
  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgb(34 41 47 / 14%);
  border-radius: 0.357rem;
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  .image-wrapper {
    img {
      width: 100%;
      height: auto;
    }
  }

  .info-wrapper {
    .payment-wrapper {
      p {
        color: #6e6b7b;
        font-weight: 500;
      }
    }
  }
  .action-wrapper {
    .add-button {
      background-color: #7367f0;
      color: #fff;
    }
  }
}
</style>
