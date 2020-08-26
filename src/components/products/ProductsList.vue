<template>
  <!--  <div class="main__products__wrapper">-->
<!--  <transition-group-->
<!--      name="fade"-->
<!--      mode="out-in"-->
<!--      class="main__products__wrapper"-->
<!--      tag="div"-->
<!--  >-->
    <Skeleton>
<!--    <app-product-item-->
<!--        v-for="(item, index) in productsList"-->
<!--        :item="item"-->
<!--        :key="index"/>-->

      <div class="products__item"
           v-for="(item, index) in productsList"
           :key="index"
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
    </Skeleton>
<!--  </transition-group>-->
  <!--  </div>-->
</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';

// import ProductItem from '@/components/products/ProductItem';

export default {
  name: 'ProductsList',
  data: () => ({
    toggleProductItem: 0,
    loadingData: false,
    animating: false
  }),
  components: {
    // appProductItem: ProductItem
  },
  computed: {
    ...mapActions({
      getProducts: 'getProductsByCategoryId'
    }),
    ...mapGetters({
      productsList: 'productsList'
    }),
  },
  methods: {}
}
</script>