<template>
  <div class="page_wrapper">
    <main class="main login">
      <div class="login__bg" v-bind:style="{ 'background-image': 'url(' + bg + ')' }"></div>
      <div class="login__logo">
        <img :src="logo" alt="logo">
      </div>
      <div class="login__form">
        <form method="post" class="form form_login" @submit="submitValid">
          <div class="form__input">
            <label for="login">
              <font-awesome-icon icon="user"/>
            </label>
            <input v-model="login"
                   id="login"
                   type="text"
                   name="login"
                   placeholder="Login"
                   autocomplete="off">
          </div>
          <div class="form__input">
            <label for="password">
              <font-awesome-icon icon="key"/>
            </label>
            <input v-model="password"
                   id="password"
                   type="password"
                   name="password"
                   placeholder="Password"
                   autocomplete="off">
          </div>
          <div class="form__submit">
            <button class="submit" type="submit">
              <span class="bubble"></span>
              <span class="text">{{submit}}</span>
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
  import bg from '@/assets/img/login_bg.png';
  import logo from '@/assets/img/logo.png';

  // import axios from 'axios';

  export default {
    name: 'Home',
    data: () => ({
      bg: bg,
      logo: logo,
      submit: 'Sign in',
      errors: '',
      login: '',
      password: '',
    }),
    methods: {
      submitValid(e) {
        //if you want to send any data into server before redirection then you can do it here

        if (this.login && this.password && this.login == 'debug' && this.password == '1234') {
          this.$router.push('/product');
        }

        this.errors = [];
        document.querySelector('input').classList.remove('error');
        this.submit = 'Connecting...';

        setTimeout(() => {
          this.submit = 'Sign in';
          if (!this.password && this.password !== '1234') {
            document.querySelector('#password').classList.add('error');
            this.submit = 'Invalid password';
          }
          if (!this.login && this.login !== 'debug') {
            document.querySelector('#login').classList.add('error');
            this.submit = 'User not exist';
          }
        }, 500);

        e.preventDefault();
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
