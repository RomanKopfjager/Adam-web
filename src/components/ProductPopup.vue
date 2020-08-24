<template>
  <div class="product_popup" v-if="status">
    <div class="popup__bg"
    @click="disablePopup"></div>
    <div class="popup__wrapper">
      <div class="popup__container">
        <div class="product_popup__top">
          <!--        <div class="product_popup__title">-->
          <!--          <div class="title__name">-->
          <!--            {{ title }} Title-->
          <!--          </div>-->
          <!--          <div class="title__dropdown"-->
          <!--               v-if="toggleTitle">-->
          <!--            <p>Solution 1</p>-->
          <!--            <p>Solution 2</p>-->
          <!--            <p>Solution 3</p>-->
          <!--          </div>-->
          <!--        </div>-->
          <div class="product_popup__title">
            {{ description }} Description
          </div>
        </div>
        <div class="product_popup__middle">
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
                <div class="item__description">
                  <p>{{ item.article }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product_popup__bottom">
          <div class="products__total">
            <div class="products__total__price">12.000,00 x</div>
            <div class="products__total__qty"> 1</div>
            <div class="products__total__sum">Total: 12.000,00</div>
          </div>
          <div class="products__buttons">
            <div class="products__buttons__cancel">
              <button class="black_btn">Cancel</button>
            </div>
            <div class="products__buttons__wrapper">
              <label class="checkbox black_btn">
                <input class="checkbox__input"
                       type="checkbox">
                <span class="checkbox__text">
                <span class="checkbox__text__box"></span>
                <span class="checkbox__text__content">Option</span>
              </span>
              </label>
              <label class="checkbox black_btn">
                <input class="checkbox__input"
                       type="checkbox">
                <span class="checkbox__text">
                <span class="checkbox__text__box"></span>
                <span class="checkbox__text__content">Additional</span>
              </span>
              </label>
              <div class="product_qty">
                <label>-</label>
                <input type="number" value="1">
                <label>+</label>
              </div>
            </div>
            <div class="products__buttons__save">
              <button class="btn_white">Save</button>
            </div>
          </div>
        </div>
        <div class="product_popup__bottom__options">
          <table class="table">
            <thead>
            <tr class="table__head">
              <th>Options</th>
              <th>Photo</th>
              <th>Article</th>
              <th>Name</th>
              <th>Short description</th>
              <th>Price</th>
            </tr>
            </thead>
            <tbody class="table__body">
            <tr class="table__row">
              <td>
                <div class="form__checkbox">
                  <input id="remember" type="checkbox" name="remember">
                  <label for="remember">
                    <span class="icon"></span>
                  </label>
                </div>
              </td>
              <td>
                <img :src="logo" alt="INDPC">
              </td>
              <td>
                RIX
              </td>
              <td>
                1.3 MPX
              </td>
              <td>
                Telecamera UHD
              </td>
              <td>
                Included
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    logo: String,
    title: String,
    description: String,
    productsList: Array,
    productPopupStatus: Boolean,
  },
  data: () => ({
    toggleTitle: false,
    toggleProductItem: 0,
  }),
  methods: {
    disablePopup() {
      this.$emit('disablePopupInside', false)
    },
    toggleProduct(product) {
      this.producthescription = product.description;
      this.toggleProductItem = product.id;
    },
    addToCart() {

    },
    getProducts() {
      let params = new URLSearchParams();
      params.append("token", "6b4a0ddb57e5e45797bff05bb1d09b1f");
      params.append("category_id", 92);
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
  },
  mounted() {
    this.getProducts();
  }
}
</script>