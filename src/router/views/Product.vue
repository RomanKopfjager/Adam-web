<template>
  <div class="page_wrapper">
    <div class="header">
      <div class="header__logo"
           @click="settingsPopupStatus = !settingsPopupStatus">
        <img :src="logo"
             alt="Adam | Eva">
      </div>
      <div class="header__search">
        <div class="header__search__total">
          <span class="text">Total:</span>
          <span class="sum">
            <span class="currency">&#8364;</span>
            <span class="value">0,00</span>
          </span>
        </div>
        <div class="form form_search">
          <div class="form__input">
            <input type="text" placeholder="Global search">
          </div>
          <div class="form__submit">
            <button type="submit"
                    class="submit"
                    @click="quotationPopupStatus = !quotationPopupStatus">Quotation
            </button>
          </div>
        </div>
      </div>
    </div>
    <main class="main main__wrapper main__product">
      <div class="main__aside">
        <div class="main__aside__hide"></div>

        <app-categories-list/>

      </div>
      <div class="main__content">
        <div class="main__cart">

          <app-products-list-in-cart/>

          <div class="main__products__wrapper">
            <div class="products__item"
                 v-for="(item, index) in inCart"
                 :key="index"
                 @click="toggleCart(index)"
                 :class="{ 'active active_color' : toggleCartItem === index }">
              <div class="products__item__wrapper">
                <div class="item__name">
                  <p>{{ item.article }}</p>
                </div>
                <div class="item__image">
                  <img :src="item.image" alt="INDPC">
                </div>
                <div class="item__price">
                  <span class="currency">&#8364;</span>
                  <span class="value">{{ item.price }}</span>
                </div>
                <div class="item__buttons">
                  <button class="product__add_to_cart" @click="removeFromCart(index)">Remove</button>
                  <router-link class="product_info" :to="`/product/${item.id}`">Show Info</router-link>
                  <div class="product_qty">
                    <label>-</label>
                    <input type="number" value="1">
                    <label>+</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main__products__container">
          <div class="main__products__title">
            <p>{{ productDescription }}</p>
          </div>
          <app-products-list/>
        </div>
      </div>
    </main>
    <app-footer/>
    <app-settings-popup
        :logo="logo"
        @disablePopupInside="disablePopup"
        :status=settingsPopupStatus
    />
    <!--    <app-quotations-popup-->
    <!--        :logo="logo"-->
    <!--        @disablePopupInside='disablePopup'-->
    <!--        :status=quotationPopupStatus-->
    <!--        :products-list="productsList"-->
    <!--    />-->
        <app-product-popup
            :logo="logo"
            @disablePopupInside="disablePopup"/>
  </div>
</template>


<script>
import logo from '@/assets/img/logo_black.png';

// import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import CategoriesList from '@/components/categories/CategoriesList.vue';
import ProductsList from '@/components/products/ProductsList.vue';
import ProductsListInCart from '@/components/cart/ProductsListInCart.vue';

import SettingsPopup from '@/components/popup/SettingsPopup.vue';
// import QuotationsPopup from '@/components/QuotationsPopup.vue';
import ProductPopup from '@/components/popup/ProductPopup.vue';

export default {
  name: 'Product',
  data: () => ({
    logo: logo,
    productDescription: '',
    inCart: [],

    toggleCartItem: null,
    popupStatus: false,

    settingsPopupStatus: false,
    productPopupStatus: false,
    quotationPopupStatus: false,
  }),
  components: {
    appSettingsPopup: SettingsPopup,
    // appQuotationsPopup: QuotationsPopup,
    appProductPopup: ProductPopup,
    // appHeader: Header,
    appFooter: Footer,
    appCategoriesList: CategoriesList,
    appProductsList: ProductsList,
    appProductsListInCart: ProductsListInCart,
  },
  computed: {
  },
  methods: {
    disablePopup() {
      this.settingsPopupStatus = false;
      this.productPopupStatus = false;
      this.quotationPopupStatus = false;
    },
  },
}
</script>
