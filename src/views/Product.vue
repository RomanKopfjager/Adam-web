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

        <div class="main__categories__list">
          <div class="categories__list">
            <div class="categories__list__item"
                 v-for="item in categoriesList"
                 :class="{'categories__list__item__has_sub': item.sub_category.length}"
                 :key="item.id">
            <span @click="toggleCategory(item.id)"
                  :class="{ 'active active_color' : toggleCategoryItem === item.id }"
                  class="text">
              <span>{{ item.localizations[0].name }}</span>
              <span class="arrow"></span>
            </span>
              <app-transition-dropdown>
                <div class="sub__menu"
                     v-if="item.sub_category.length && toggleCategoryItem === item.id">
                  <div class="sub__menu__item"
                       v-for="subCategory in item.sub_category"
                       :key="subCategory.id">
                  <span v-if="subCategory.localizations.length"
                        @click="toggleSubCategory(subCategory.id)"
                        :class="{ 'active active_color' : toggleSubCategoryItem === subCategory.id }"
                        class="text">{{ subCategory.localizations[0].name }}</span>
                  </div>
                </div>
              </app-transition-dropdown>
            </div>
          </div>
        </div>
      </div>
      <div class="main__content">
        <div class="main__cart">
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
          <div class="main__products__wrapper">
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
                  <img :src="item.image" alt="INDPC">
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
          </div>
        </div>
      </div>
    </main>
    <footer class="footer">
      <div class="footer__search">
        <div class="form form_search">
          <div class="form__input">
            <input type="text" placeholder="Search:">
          </div>
          <div class="form__submit">
            <input class="show_prices" type="submit" :value="time.getHours() + ':' + time.getMinutes()">
          </div>
        </div>
      </div>
    </footer>
    <app-settings-popup
        :logo="logo"
        @disablePopupInside="disablePopup"
        :status=settingsPopupStatus
    />
    <app-quotations-popup
        :logo="logo"
        @disablePopupInside='disablePopup'
        :status=quotationPopupStatus
        :products-list="productsList"
    />
    <app-product-popup
        :logo="logo"
        @disablePopupInside='disablePopup'
        :status=productPopupStatus
        :products-list="productsList"/>
  </div>
</template>


<script>
import bg from '@/assets/img/login_bg.png';
import logo from '@/assets/img/logo_black.png';
import Animations from '@/animations/Animations.js';

import SettingsPopup from '@/components/SettingsPopup.vue';
import QuotationsPopup from '@/components/QuotationsPopup.vue';
import ProductPopup from '@/components/ProductPopup.vue';

import axios from 'axios';

export default {
  name: 'Product',
  data: () => ({
    bg: bg,
    logo: logo,
    productDescription: '',
    time: new Date(),
    inCart: [],
    categoriesList: [],
    productsList: [],

    toggleCategoryItem: 0,
    toggleSubCategoryItem: 0,
    toggleProductItem: 0,
    toggleCartItem: null,
    popupStatus: false,

    settingsPopupStatus: false,
    productPopupStatus: false,
    quotationPopupStatus: false,
  }),
  components: {
    appSettingsPopup: SettingsPopup,
    appQuotationsPopup: QuotationsPopup,
    appProductPopup: ProductPopup,
  },
  created() {

  },
  methods: {
    disablePopup(){
      console.log('click')
      this.settingsPopupStatus = false;
      this.productPopupStatus = false;
      this.quotationPopupStatus = false;
    },
    toggleCategory(id) {
      if (this.toggleCategoryItem === id) {
        this.toggleCategoryItem = null;
      } else {
        this.toggleCategoryItem = id;
        this.getProducts(id);
      }
    },
    toggleSubCategory(id) {
      if (this.toggleSubCategoryItem === id) {
        this.toggleSubCategoryItem = null;
      } else {
        this.toggleSubCategoryItem = id;
        this.getProducts(id);
      }
    },
    toggleProduct(product) {
      this.productDescription = product.description;
      this.toggleProductItem = product.id;
      this.toggleCartItem = null;
    },
    toggleCart(index) {
      this.toggleProductItem = null;
      this.toggleCartItem = index;
    },

    getCategories() {

      Object.filter = (obj, predicate) =>
          Object.keys(obj)
              .filter(key => predicate(obj[key]))
              .reduce((res, key) => (res[key] = obj[key], res), {});


      let params = new URLSearchParams();
      params.append("token", "6b4a0ddb57e5e45797bff05bb1d09b1f");
      axios.post('http://localhost:8080/3.00/commercial_categories_list.php', params)
          .then(response => {
            let categories = response.data.response;
            let subCategories = [];
            categories.forEach((category) => {
              category.sub_category = [];
              if (category.parent_id) {
                subCategories.push(category)
              } else {
                subCategories.forEach((subCat) => {

                  if (category.id == subCat.parent_id) {
                    category.sub_category.push(subCat);
                  }
                });
                this.categoriesList.push(category)
              }
            })
          })
          .catch(error => {
            console.log(error);
          });
    },

    getProducts(id) {
      let params = new URLSearchParams();
      params.append("token", "6b4a0ddb57e5e45797bff05bb1d09b1f");
      params.append("category_id", id);
      params.append("mode", 0);
      params.append("archive", 0);
      this.productsList = [];
      axios.post('http://localhost:8080/3.00/commercial_items_list.php', params)
          .then(response => {
            let products = response.data.response;
            console.log(products)
            products.forEach((product) => {
              if (!product.image) {
                product.image = this.logo;
              }
              this.productsList.push(product);
            })
          })
          .catch(error => {
            console.log(error);
          });
    },


    getTagValue(item) {
      document.querySelector(".tags__list__item__current .text").innerHTML = item
    },

    addToCart(item) {
      console.log(item)
      console.log(this.inCart)
      this.inCart.push(item);
    },
    removeFromCart(item) {
      console.log(item)
      this.inCart.splice(item, 1);
    },
    showButtons(item) {
      this.productDescription = item.name
    }
  },
  watch: {
    getRefs() {
      console.log(this.$refs.common)
    }
  },
  mounted() {
    document.querySelectorAll(".products__item").forEach(function (item) {
      item.onclick = () => {
        document.querySelectorAll(".products__item").forEach(function (e) {
          e.classList.remove('active')
        })
        Animations.toggleClass(item, 'active');
      };
    })

    if (document.querySelector('.main__products__wrapper').addEventListener) {
      // IE9, Chrome, Safari, Opera
      document.querySelector('.main__products__wrapper').addEventListener("mousewheel", Animations.scrollHorizontally, false);
      // Firefox
      document.querySelector('.main__products__wrapper').addEventListener("DOMMouseScroll", Animations.scrollHorizontally, false);
    } else {
      // IE 6/7/8
      document.querySelector('.main__products__wrapper').attachEvent("onmousewheel", Animations.scrollHorizontally);
    }
    document.querySelector('.show_prices').onclick = function () {
      Animations.toggleClass(document.querySelector('.header__search__total'), 'active');
      document.querySelectorAll('.item__price').forEach((item) => {
        Animations.toggleClass(item, 'active')
      })
    }
    this.getCategories();
  }
}
</script>
