<template>
  <div class="products__item"
       @click="toggleProduct(item)"
       :class="{ 'active active_color' : activeProduct === item.id }">
    <div class="products__item__border"></div>
    <div class="products__item__wrapper">
      <div class="item__count"
           v-if="inCart">
        {{ inCart }}
      </div>
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
        <button class="product__add_to_cart" @click="addToCart(item, quantity)">Add to cart</button>
        <router-link class="product_info" :to="`/product/${item.id}`">Show Info</router-link>
        <div class="product_qty">
          <label>-</label>
          <input type="number" v-model.number="quantity" min="1" max="10">
          <label>+</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  name: 'ProductItem',
  props: {
    item: Object,
  },
  data: () => ({
    inCart: 0,
    quantity: 1
  }),
  computed: {
    ...mapGetters({
      activeProduct: 'activeProduct',
      productInfo: 'productInfo',
    }),
    ...mapMutations({
      descritpion: 'ACTIVE_PRODUCT',
    }),
  },
  methods: {
    ...mapActions({
      getProductInfoById: 'getProductInfoById'
    }),
    ...mapMutations({
      toggleActiveProduct: 'ACTIVE_PRODUCT',
      addProductToCart: 'ADD_PRODUCT_TO_CART',
    }),
    toggleProduct(item) {
      // this.productDescription = item.description;
      this.toggleActiveProduct({
        id: item.id,
        description: item.description
      });
      console.log(this.descritpion)
      // console.log(this.toggleProductItem)

      // this.toggleCartItem = null;
      // console.log(this.toggleProductItem)
      // console.log(item.id)
    },


    async addToCart(id, quantity) {
      //Getting all product data
      console.log(id)
      // await this.getProductInfoById(id);


      //Adding product to cart
      this.inCart += quantity;
      this.addProductToCart({
        id: id,
        quantity: quantity
      });
      // console.log(this.productInfo)
    },
  }
}
</script>