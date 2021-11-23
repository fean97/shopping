<template>
  <div class="product-item-wrapper">
    <div class="image-product">
      <router-link :to="link">
        <img :src="items.image" />
      </router-link>
    </div>
    <div class="price-product">${{ items.price }}</div>
    <div class="info-product">
      <p>{{ items.name }}</p>
      <p class="description">{{ items.description }}</p>
    </div>
    <div class="action-product">Add to cart</div>
  </div>
</template>

<script>


export default {
  name: "ProductItem",
  props: {
    items: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    link() {
      return `/detail/${this.items.id}`;
    },
  },
  data() {
    return {

    };
  },
};
</script>
<style lang="scss" scoped>
.product-item-wrapper {
  font-weight: 500;
  min-height: 400px;
  padding: 20px;
  border-radius: 0.428rem;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  background-color: #fff;
  margin-bottom: 10px;
  .image-product {
    img {
      max-width: 100%;
      height: auto;
    }
  }
  .info-product {
    .description {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .action-product {
    background-color: #7367f0;
    border-color: #7367f0;
    color: #fff;
    padding: 10px 0;
  }
}
</style>
