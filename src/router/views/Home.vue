<template>

  <div class="page_wrapper">
    <main class="main login">
      <div class="login__bg"
           :style="{ 'background-image': 'url(' + bg + ')' }"></div>
      <div class="login__logo">
        <img :src="logo"
             alt="logo">
      </div>
      <div class="login__form">
        <form method="post"
              autocomplete="off"
              class="form form_login"
              @submit.prevent="submitValid">
          <div class="form__input">
            <label for="login">
              <font-awesome-icon icon="user"/>
            </label>
            <input v-model="loginValue"
                   id="login"
                   type="text"
                   name="login"
                   placeholder="Login"
                   autocomplete="false">
          </div>
          <div class="form__input">
            <label for="password">
              <font-awesome-icon icon="key"/>
            </label>
            <input v-model="passwordValue"
                   id="password"
                   type="password"
                   name="password"
                   placeholder="Password"
                   autocomplete="false">
          </div>
          <div class="form__submit">
            <button class="submit" type="submit">
              <span class="bubble"></span>
              <span class="text">{{ submit }}</span>
            </button>
          </div>
          <div class="form__checkbox">
            <input id="remember" type="checkbox" name="remember">
            <label for="remember">
              <span class="icon"></span>
              <span class="text">Remember me</span>
            </label>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import logo from '@/assets/img/logo.png';
import bg from '@/assets/img/login_bg.png';
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    bg: bg,
    logo: logo,
    submit: 'Sign in',
    loginValue: '',
    passwordValue: ''
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      loginText: 'loginText',
      status: 'authStatus'
    }),
  },
  methods: {
    ...mapActions(['userLogin']),
    async submitValid() {
      this.submit = 'Connecting...';

      // Sending login data to store
      await this.userLogin({
        login: this.loginValue,
        password: this.passwordValue
      });
      this.submit = this.loginText;

      // Check if login data is valid
      if(this.status) {
        this.$router.push('/product');
      }
    }
  },
  mounted() {

    document.querySelector('.login').addEventListener('mousemove', function (e) {
      let img = document.querySelector('.login__bg');

      let amountMovedX = (e.pageX * -1 / 70);
      let amountMovedY = (e.pageY * -1 / 70);
      img.style.backgroundPosition = amountMovedX + 'px ' + amountMovedY + 'px';
    });

    var $bubble, buttonSize, x, y;

    document.querySelector('.submit').onclick = function (mouseEvent) {
      var $button = this;

      $bubble = document.querySelector('.bubble');

      // To avoid any overlaps, remove the previous bubble if it exists
      $bubble.classList.remove('animate');

      // Calculate the highest/widest dimension of the button, to
      // make the bubble size fit the whole button
      buttonSize = Math.max(
          $button.offsetWidth,
          $button.offsetHeight
      );

      // Use the dimensional calculations, to define the same
      // width and height, for the bubble. If they weren't
      // equal, it wouldn't really be a bubble. Would it?
      $bubble.style.height = buttonSize + 'px';
      $bubble.style.width = buttonSize + 'px';

      // Grab the button's page offset and subsctract the bubble's size
      // divided by two. This calculates the spawn point for the bubble.
      x = mouseEvent.pageX - $button.offsetLeft - $bubble.offsetWidth / 2;
      y = mouseEvent.pageY - $button.offsetTop - $bubble.offsetHeight / 2;

      // Define the coordinates of the bubble origin,
      // based on the mouse click
      // $bubble.css({top: y + 'px', left: x + 'px'}).addClass('animate');
      // $bubble.css({top: y + 'px', left: x + 'px'}).addClass('animate');

      $bubble.style.top = y + 'px';
      $bubble.style.left = x + 'px';
      $bubble.classList.add('animate');
    };

  }
}
</script>
