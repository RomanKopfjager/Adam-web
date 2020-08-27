<template>
  <transition-group
      v-click-outside="closeEvent"
      name="fade"
      mode="out-in"
      class="main__products__wrapper main__products__wrapper__list__in_cart"
      tag="div">
    <app-product-item-in-cart
        v-for="(item, index) in productsListInCart"
        :item="item"
        :index="index"
        :key="index"/>
  </transition-group>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';

import ProductItemInCart from '@/components/products/ProductItemInCart';

export default {
  name: 'ProductsListInCart',
  data: () => ({
  }),
  components: {
    appProductItemInCart: ProductItemInCart
  },
  computed: {
    ...mapGetters({
      productsListInCart: 'productsListInCart'
    }),
    ...mapActions({
      getProducts: 'getProductsByCategoryId'
    }),
  },
  methods: {
    ...mapMutations({
      toggleActiveProductInCart: 'ACTIVE_PRODUCT_IN_CART',
    }),
    closeEvent(){
      this.toggleActiveProductInCart(null)
    }
  },
  mounted() {

    let element = document.querySelector('.main__products__wrapper__list__in_cart');

    if (element.addEventListener) {
      // IE9, Chrome, Safari, Opera
      element.addEventListener("mousewheel", scrollHorizontally, false);
      // Firefox
      element.addEventListener("DOMMouseScroll", scrollHorizontally, false);
    } else {
      // IE 6/7/8
      element.attachEvent("onmousewheel", scrollHorizontally);
    }

    function scrollHorizontally(e) {
      console.log(e)
      e = window.event || e;
      let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      element.scrollLeft -= (delta * 40); // Multiplied by 40
      e.preventDefault();
    }
    // document.querySelector('.show_prices').onclick = function () {
    //   Animations.toggleClass(document.querySelector('.header__search__total'), 'active');
    //   document.querySelectorAll('.item__price').forEach((item) => {
    //     Animations.toggleClass(item, 'active')
    //   })
    // }
  }
}
</script>