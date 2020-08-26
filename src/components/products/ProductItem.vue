<template>
  <div class="products__item"
       @click="toggleProduct(item)"
       :class="{ 'active active_color' : toggleProductItem === item.id }">
    <div class="products__item__wrapper">
      <div class="item__name">
        <p>{{ item.article }}</p>
      </div>
      <div class="item__image">
        <transition name="fade">
          <img :src="item.image" alt="INDPC">
        </transition>
      </div>
      <div class="item__price">
        <span class="currency">&#8364;</span>
        <span class="value">{{ item.price }}</span>
      </div>
      <div class="item__buttons">
        <button class="product__add_to_cart" @click="addToCart(item)">Add to cart</button>
        <router-link class="product_info" :to="`/product/${item.id}`">Show Info</router-link>
        <div class="product_qty">
          <label>-</label>
          <input type="number" value="1">
          <label>+</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'ProductItem',
  props: {
    item: Object,
  },
  data: () => ({
    toggleProductItem: 0
  }),
  ...mapGetters({
    categoryStatus: 'categoryStatus'
  }),
  computed: {},
  methods: {
    toggleProduct(product) {
      this.productDescription = product.description;
      this.toggleProductItem = product.id;
      this.toggleCartItem = null;
    },
    addToCart(item) {
      console.log(item)
      console.log(this.inCart)
      this.inCart.push(item);
    },
  }
}
</script>