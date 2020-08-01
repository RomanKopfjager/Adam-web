<template>
  <div class="page_wrapper">
    <div class="header">
      <div class="header__logo">
        <img :src="logo" alt="Adam | Eva">
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
    <main class="main main__wrapper">
      <div class="main__aside">
        <div class="main__categories__tags">
          <ul class="tags__list">
            <li class="tags__list__item tags__list__item__current">
              <span class="text">All</span>
              <ul class="tags__list__sub">
                <li class="tags__list__item">All</li>
                <li class="tags__list__item"
                    v-for="item in tagsList"
                    :key="item.id"
                    @click="getTagValue(item.localizations[0].name)">
                  {{item.localizations[0].name}}
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="main__categories__list">
          <ul class="categories__list">
            <li class="categories__list__item categories__list__item__has_sub" v-for="item in categoriesList" :key="item.id">
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

        </div>
        <div class="main__products">
          <div class="main__products__item">
            <div class="item__name">
              <p>INDPC</p>
            </div>
            <div class="item__image">
              <img :src="logo" alt="INDPC">
            </div>
            <div class="item__price">
              <span class="currency">&#8364;</span>
              <span class="value">1.500,00</span>
            </div>
            <div class="item__buttons">
              <button class="product__add_to_cart">Add to cart</button>
              <button class="product_info">Show Info</button>
              <!--<div class="product_qty"></div>-->
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="footer">
      <div class="footer__search">
        <form method="post" class="form form_search">
          <div class="form__input">
            <input type="text" placeholder="Search:">
          </div>
          <div class="form__submit">
            <input type="submit" :value="time.getHours() + ':' + time.getMinutes()">
          </div>
        </form>
      </div>
    </footer>
  </div>
</template>


<script>
  import bg from '@/assets/img/login_bg.png';
  import logo from '@/assets/img/logo_black.png';

  // import axios from 'axios';

  export default {
    name: 'Home',
    data: () => ({
      bg: bg,
      logo: logo,
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
      time: new Date(),
    }),
    methods: {
      submit() {

      },
      getTagValue(item){
        document.querySelector(".tags__list__item__current .text").innerHTML = item
      }
    }
    ,
    mounted() {
      let toggleClass = (target, className) => {
        if(target.classList.contains(className)){
          target.classList.remove(className);
        } else {
          target.classList.add(className);
        }
      };
      let slideUp = (target, duration = 500) => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
          target.style.display = 'none';
          target.style.removeProperty('height');
          target.style.removeProperty('padding-top');
          target.style.removeProperty('padding-bottom');
          target.style.removeProperty('margin-top');
          target.style.removeProperty('margin-bottom');
          target.style.removeProperty('overflow');
          target.style.removeProperty('transition-duration');
          target.style.removeProperty('transition-property');
          //alert("!");
        }, duration);
      }

      let slideDown = (target, duration = 500) => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;

        if (display === 'none')
          display = 'block';

        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
          target.style.removeProperty('height');
          target.style.removeProperty('overflow');
          target.style.removeProperty('transition-duration');
          target.style.removeProperty('transition-property');
        }, duration);
      }
      var slideToggle = (target, duration = 500) => {
        if (window.getComputedStyle(target).display === 'none') {
          return slideDown(target, duration);
        } else {
          return slideUp(target, duration);
        }
      }

      document.querySelector(".tags__list__item__current").addEventListener('click', function () {
        let subMenu = document.querySelector(".tags__list__sub");
        toggleClass(subMenu, 'active');
        toggleClass(this, 'active');
      });

      document.querySelectorAll(".categories__list__item__has_sub").forEach(function (item) {
        item.onclick = function () {
          toggleClass(this, 'active');
          slideToggle(this.childNodes[1], 300);
        };
      })
    }
  }
</script>
