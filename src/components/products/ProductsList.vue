<template>
  <transition-group
      v-click-outside="closeEvent"
      name="fade"
      mode="out-in"
      class="main__products__wrapper main__products__wrapper__list"
      tag="div">
    <app-product-item
        v-for="(item, index) in productsList"
        :item="item"
        :key="index"/>
  </transition-group>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

import ProductItem from '@/components/products/ProductItem';

export default {
  name: 'ProductsList',
  data: () => ({}),
  components: {
    appProductItem: ProductItem
  },
  computed: {
    ...mapGetters({
      productsList: 'productsList'
    }),
    ...mapActions({
      getProducts: 'getProductsByCategoryId'
    }),
  },
  methods: {
    ...mapMutations({
      toggleActiveProduct: 'ACTIVE_PRODUCT',
    }),
    closeEvent() {
      this.toggleActiveProduct({
        id: null,
        description: ''
      })
    },
  },
  mounted() {

    let element = document.querySelector('.main__products__wrapper__list');

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

  }
}
</script>