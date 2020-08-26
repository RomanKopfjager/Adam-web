<template>
  <div class="header">
    <div class="header__logo"
         @click="settingClick">
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
                  @click="quotationClick">Quotation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/logo_black.png';

export default {
  name: 'Header',
  props: {
    settingsPopupStatus: Boolean,
    quotationPopupStatus: Boolean
  },
  data: () => ({
    logo: logo,
  }),
  methods: {
    settingClick() {
      this.settingsPopupStatus = !this.settingsPopupStatus
    },
    quotationClick() {
      this.quotationPopupStatus = !this.quotationPopupStatus
    }
  }
}
</script>