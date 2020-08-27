<template>
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
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    time: new Date(),
  })
}
</script>