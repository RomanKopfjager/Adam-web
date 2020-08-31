<template>
  <transition name="fade" mode="out-in">
  <div class="product_popup" v-if="productPopupStatus">
    <div class="popup__bg"
         @click="disablePopup"></div>
    <div class="popup__wrapper">
      <div class="popup__container">
        <div class="product_popup__top">
          <div class="product_popup__title">
            {{ description }} Description
          </div>
        </div>
        <div class="product_popup__middle">
          <div class="main__products__wrapper">
            <div class="products__item"
                 v-for="(component, index) in productPopupComponentsList"
                 :key="index"
                 @click="toggleComponent(component, index)"
                 :class="{ 'active' : toggleComponentItem === index }">
              <div class="products__item__wrapper">
                <div class="item__name">
                  <p>{{ component[activeComponent].name }}</p>
                </div>
                <div class="item__image">
                  <img :src="component[activeComponent].url"
                       :alt="component[activeComponent].name">
                </div>
                <div class="item__description">
                  <p>{{ component[activeComponent].prices ? component[activeComponent].prices[56] : 'Included' }}</p>
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
              <button class="black_btn"
              @click="disablePopup">Cancel</button>
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
              <button class="btn_white" @click="saveS">Save</button>
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
            <tr class="table__row"
                v-for="(component, index) in componentsList"
                :key="index">
              <td>
                <div class="form__checkbox">
                  <input :id="'component_' + component.id"
                         type="checkbox"
                         name="remember">
                  <label :for="'component_' + component.id">
                    <span class="icon"></span>
                  </label>
                </div>
              </td>
              <td>
                <img :src="component.url ? component.url : logo" :alt="component.name">
              </td>
              <td>
                {{ component.name }}
              </td>
              <td>
                {{ component.name }}
              </td>
              <td>
                {{ component.name }}
              </td>
              <td>
                {{ component.prices ? component.prices[56] : 'Included' }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  props: {
    status: Boolean,
    logo: String,
    title: String,
    description: String,
  },
  data: () => ({
    toggleTitle: false,
    toggleComponentItem: 0,

    activeComponent: 0,
    componentsList: []
  }),
  computed: {
    ...mapGetters({
      product: 'product',
      productInfo: 'productInfo',
      productsListInCart: 'productsListInCart',
      productPopupStatus: 'productPopupStatus',
      productPopupComponentsList: 'productPopupComponentsList'
    }),
  },
  methods: {
    ...mapActions({
      disabledProductPopup: 'disabledProductPopup',
      addProductToCart: 'addProductToCart',
    }),
    disablePopup() {
      this.disabledProductPopup();
    },
    toggleComponent(component, index) {
      console.log(component);
      this.toggleComponentItem = index
      this.componentsList = component;
    },
    saveS(){
      this.addProductToCart({
        product: this.product,
        openComponents: false
      });
      console.log(this.product)
      this.disablePopup();
    }

  },
  mounted() {

  }
}
</script>