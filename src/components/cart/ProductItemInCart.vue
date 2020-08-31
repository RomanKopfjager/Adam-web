<template>
  <div class="products__item"
       @click="toggleProduct(index)"
       :class="{ 'active' : activeProductInCart === index }">
    <div class="products__item__border"></div>
    <div class="products__item__wrapper">
      <div class="item__name">
        <p>{{ product.article }}</p>
      </div>
      <div class="item__image">
        <transition name="fade">
          <img :src="product.images[0]" :alt="product.article">
        </transition>
      </div>
      <div class="item__price">
        <span class="currency">&#8364;</span>
        <span class="value">{{ product.price }}</span>
      </div>
      <div class="item__buttons">
        <button class="product__add_to_cart" @click="removeFromCart(index)">Remove</button>
        <router-link class="product_info" :to="`/product/${product.id}`">Edit</router-link>
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
import {mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  name: 'ProductItemInCart',
  props: {
    product: Object,
    index: Number
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      activeProductInCart: 'activeProductInCart',
    }),
  },
  methods: {
    ...mapActions({
      removeProductFromCart: 'removeProductFromCart',
    }),
    ...mapMutations({
      toggleActiveProductInCart: 'ACTIVE_PRODUCT_IN_CART',
    }),
    toggleProduct(item) {
      this.toggleActiveProductInCart(item);
    },
    removeFromCart(index) {
      this.toggleActiveProductInCart(null);
      this.removeProductFromCart(index);
    },
  },
  events: {}
}
</script>