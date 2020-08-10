<template>
  <div class="page_wrapper">
    <div class="header">
      <div class="header__logo">
        <router-link to="/product">
          <img :src="logo" alt="Adam | Eva">
        </router-link>
      </div>
      <div class="header__search">
        <div class="header__search__total">
          <span class="text">Total:</span>
          <span class="sum">
            <span class="currency">&#8364;</span>
            <span class="value">0,00</span>
          </span>
        </div>
        <form method="post" class="form form_search">
          <div class="form__input">
            <input type="text" placeholder="Global search">
          </div>
          <div class="form__submit">
            <input type="submit" value="Quotation">
          </div>
        </form>
      </div>
    </div>
    <main class="main main__wrapper main__products">
      <div class="products__img">
        <img :src="logo" alt="Adam | Eva">
      </div>
      <div class="products__info">
        <div class="products__info__list">
          <ul>
            <li class="list__item">Text</li>
            <li class="list__item">Text</li>
            <li class="list__item">Text</li>
            <li class="list__item">Text</li>
          </ul>
        </div>
        <div class="products__info__products">
          <div class="products__item" v-for="(item, index) in productsList" :key="index"
               @click="showButtons(item)">
            <div class="products__item__wrapper">
              <div class="item__name">
                <p>{{item.article}}</p>
              </div>
              <div class="item__image">
                <img :src="logo" alt="INDPC">
              </div>
              <div class="item__price">
                <span class="currency">&#8364;</span>
                <span class="value">{{item.price}}</span>
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
  </div>
</template>
<script>
  import bg from '@/assets/img/login_bg.png';
  import logo from '@/assets/img/logo_black.png';
  import Animations from '@/animations/Animations.js';

  export default {
    name: 'Products',
    data: () => ({
      bg: bg,
      logo: logo,
      time: new Date(),
      productsList: [
        {
          "id": 2562,
          "sort": 0,
          "article": "INDPC",
          "component": 0,
          "creation_date": 1588661371,
          "update_date": 1588661371,
          "name": "Industrial PC",
          "description": "Embedded industrial computer",
          "price": 1500,
          "vat": 0.22,
          "image": "https://soprano.soprano.biz/Storage/Items/Items/2562-0"
        },
        {
          "id": 2575,
          "sort": 0,
          "article": "SP11",
          "component": 0,
          "creation_date": 1588661371,
          "update_date": 1588661371,
          "name": "Semple for 3D scanning: maetal parts",
          "description": "",
          "price": 3,
          "vat": 0.22,
          "image": null
        }, {
          "id": 215,
          "sort": 1,
          "article": "TR10",
          "component": 0,
          "creation_date": 1588661371,
          "update_date": 1588841130,
          "name": "Rotary table",
          "description": "Heavy rotary table for automatic scaning, Max load 15 KG",
          "price": 2800,
          "vat": 0.22,
          "image": "https://soprano.soprano.biz/Storage/Items/Items/215-0"
        }, {
          "id": 95,
          "sort": 8,
          "article": "ACC-ROTARY-LW",
          "component": 0,
          "creation_date": 1588661371,
          "update_date": 1588661371,
          "name": "Rotary Table",
          "description": "Rotary Table Light Weight",
          "price": 1490,
          "vat": 0.22,
          "image": "https://soprano.soprano.biz/Storage/Items/Items/95-0"
        }, {
          "id": 96,
          "sort": 9,
          "article": "ACC-ROTARY-HD",
          "component": 0,
          "creation_date": 1588661371,
          "update_date": 1588661371,
          "name": "Rotary Table+Case",
          "description": "Rotary Table Heavy Duty + Travel Case",
          "price": 2990,
          "vat": 0.22,
          "image": "https://soprano.soprano.biz/Storage/Items/Items/96-0"
        }],
      inCart: []
    }),
    methods: {
      addToCart(item) {
        console.log(item)
        console.log(this.inCart)
        this.inCart.push(item);
      },
      showButtons(item) {
        this.productDescription = item.name
      }
    },
    mounted() {

      document.querySelectorAll(".products__item").forEach(function (item) {
        item.onclick = () => {
          document.querySelectorAll(".products__item").forEach(function (e) {
            e.classList.remove('active')
          });
          Animations.toggleClass(item, 'active');
        };
      })
    }
  }
</script>