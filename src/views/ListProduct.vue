<template>
  <div class="home-wrapper">
    <TopMenuBar />
    <div class="body-wrapper">
      <div class="add-product">
        <el-button type="primary" :icon="addIcon" @click="onClickAdd"
          >Add Product</el-button
        >
      </div>
      <div class="search-wrapper">
        <el-input v-model="valueSearch" placeholder="Please input" />
        <el-button :icon="searchIcon" @click="onClickSearch">Search</el-button>
      </div>
      <div class="list-item-wrapper">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in dataProducts" :key="index">
            <ProductItem :items="item" />
          </el-col>
        </el-row>
      </div>
      <div class="pagination-wrapper">
        <el-pagination
          v-loading.fullscreen.lock="fullscreenLoading"
          :page-size="12"
          :pager-count="12"
          layout="prev, pager, next"
          :total="totalItem"
          @current-change="onChangePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TopMenuBar from "@/components/TopMenuBar";
import ProductItem from "@/components/ProductItem";
import { Plus, Search } from "@element-plus/icons";
export default {
  name: "Home",
  components: {
    TopMenuBar,
    ProductItem,
  },
  computed: {
    ...mapState(["dataProducts", "totalItem"]),
  },
  methods: {
    ...mapActions(["fetchDataListProductsAction"]),
    onClickAdd() {
      this.$router.push({ path: "/create" });
    },
    onClickSearch() {
      this.fetchListProduct(true, true);
    },
    onChangePage(value) {
      this.page = value;
      if (this.isProcessSearch) return;
      this.fetchListProduct();
    },
    async fetchListProduct(isCountTotal = false, isSearch = false) {
      this.fullscreenLoading = true;
      this.isProcessSearch = true;
      await this.fetchDataListProductsAction({
        isSearch: isSearch,
        isCountTotal: isCountTotal,
        valueSearch: this.valueSearch,
        page: this.page,
      });
      this.fullscreenLoading = false;
      this.isProcessSearch = false;
    },
  },
  data() {
    return {
      addIcon: Plus,
      searchIcon: Search,
      page: 1,
      fullscreenLoading: false,
      valueSearch: "",
      isProcessSearch: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchListProduct(true, false);
    });
  },
};
</script>
<style lang="scss" scoped>
.home-wrapper {
  width: 100%;
  height: 100%;
  .body-wrapper {
    padding: 1rem;
    .add-product {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 0 auto;
      margin-bottom: 20px;
    }
    ::v-deep .search-wrapper {
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 0.357rem;
      box-shadow: 0 2px 8px 0 rgb(34 41 47 / 14%);
      margin: 0 auto;
      margin-bottom: 20px;
      input {
        border: none;
        outline: none;
      }
    }
  }
}
</style>
