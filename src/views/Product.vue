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
      <main class="main main__wrapper main__product">
        <div class="main__aside">
          <div class="main__aside__hide"></div>
          <!--<div class="main__categories__tags">-->
          <!--<ul class="tags__list">-->
          <!--<li class="tags__list__item tags__list__item__current">-->
          <!--<span class="text">All</span>-->
          <!--<ul class="tags__list__sub">-->
          <!--<li class="tags__list__item">All</li>-->
          <!--<li class="tags__list__item"-->
          <!--v-for="item in tagsList"-->
          <!--:key="item.id"-->
          <!--@click="getTagValue(item.localizations[0].name)">-->
          <!--{{item.localizations[0].name}}-->
          <!--</li>-->
          <!--</ul>-->
          <!--</li>-->
          <!--</ul>-->
          <!--</div>-->
          <div class="main__categories__list">
            <ul class="categories__list">
              <li class="categories__list__item categories__list__item__has_sub" v-for="item in categoriesList"
                  :key="item.id">
                <span class="text">{{item.localizations[0].name}}</span>
                <ul class="sub__menu">
                  <li class="sub__menu__item">
                    <span class="text">Sub menu text</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="main__content">
          <div class="main__cart">
            <div class="main__cart__item" v-for="item in inCart" :key="item">
            </div>
          </div>
          <div class="main__products__container">
            <div class="main__products__title">
              <p>{{productDescription}}</p>
            </div>
            <div class="main__products__wrapper">
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

  import axios from 'axios';

  export default {
    name: 'Product',
    data: () => ({
      bg: bg,
      logo: logo,
      productDescription: '',
      tagsList: [
        {
          "id": 32,
          "localizations": [{"id": 3, "localization_id": 5, "name": "POLYGA"}, {
            "id": 4,
            "localization_id": 2,
            "name": "POLYGA"
          }]
        },
        {
          "id": 38,
          "localizations": [{"id": 1, "localization_id": 5, "name": "SOPRANO"}, {
            "id": 2,
            "localization_id": 2,
            "name": "SOPRANO"
          }]
        },
        {
          "id": 39,
          "localizations": [{"id": 5, "localization_id": 5, "name": "PROJECTS"}, {
            "id": 6,
            "localization_id": 2,
            "name": "PROGETTI"
          }]
        }
      ],
      categoriesList: [
        {
          "id": 92,
          "sort": 0,
          "parent_id": 48,
          "groups": [],
          "localizations": [{"id": 8, "localization_id": 5, "name": "Compact Line"}],
          "images": [null],
          "files": {"images": [], "videos": [], "titles": []}
        },
        {
          "id": 93,
          "sort": 0,
          "parent_id": 48,
          "groups": [],
          "localizations": [{"id": 8, "localization_id": 5, "name": "Software"}],
          "images": [null],
          "files": {"images": [], "videos": [], "titles": []}
        },
        {
          "id": 94,
          "sort": 0,
          "parent_id": 48,
          "groups": [],
          "localizations": [{"id": 8, "localization_id": 5, "name": "Service"}],
          "images": [null],
          "files": {"images": [], "videos": [], "titles": []}
        },
        {
          "id": 95,
          "sort": 0,
          "parent_id": 48,
          "groups": [],
          "localizations": [{"id": 8, "localization_id": 5, "name": "Aurora Line"}],
          "images": [null],
          "files": {"images": [], "videos": [], "titles": []}
        },
        {
          "id": 96,
          "sort": 0,
          "parent_id": 48,
          "groups": [],
          "localizations": [{"id": 8, "localization_id": 5, "name": "Personal computer"}],
          "images": [null],
          "files": {"images": [], "videos": [], "titles": []}
        },
        {
          "id": 97,
          "sort": 0,
          "parent_id": 48,
          "groups": [],
          "localizations": [{"id": 8, "localization_id": 5, "name": "HDI Line"}],
          "images": [null],
          "files": {"images": [], "videos": [], "titles": []}
        },
      ],
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
      time: new Date(),
      inCart: []
    }),
    methods: {
      submit() {

      },
      getTagValue(item) {
        document.querySelector(".tags__list__item__current .text").innerHTML = item
      },
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

      document.querySelectorAll(".categories__list__item__has_sub .text").forEach(function (item) {
        item.onclick = function () {
          document.querySelectorAll(".categories__list__item__has_sub .text").forEach(function (e) {
            e.classList.remove('active_color')
          })
          Animations.toggleClass(this, 'active_color');
          Animations.toggleClass(this, 'active');
          Animations.slideToggle(this.nextSibling, 300);
        };
      })

      document.querySelectorAll(".products__item").forEach(function (item) {
        item.onclick = () => {
          document.querySelectorAll(".products__item").forEach(function (e) {
            e.classList.remove('active')
          })
          Animations.toggleClass(item, 'active');
        };
      })

      let scrollHorizontally = (e) => {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        document.querySelector('.main__products__wrapper').scrollLeft -= (delta * 40); // Multiplied by 40
        e.preventDefault();
      }
      if (document.querySelector('.main__products__wrapper').addEventListener) {
        // IE9, Chrome, Safari, Opera
        document.querySelector('.main__products__wrapper').addEventListener("mousewheel", scrollHorizontally, false);
        // Firefox
        document.querySelector('.main__products__wrapper').addEventListener("DOMMouseScroll", scrollHorizontally, false);
      } else {
        // IE 6/7/8
        document.querySelector('.main__products__wrapper').attachEvent("onmousewheel", scrollHorizontally);
      }
      axios.post('https://soprano.soprano.biz/3.00/login.php')
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
      document.querySelector('.show_prices').onclick = function () {
        Animations.toggleClass(document.querySelector('.header__search__total'), 'active');
        document.querySelectorAll('.item__price').forEach((item) => {
          Animations.toggleClass(item, 'active')
        })
      }
    }
  }
</script>
