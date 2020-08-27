<template>
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
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    toggleCategoryItem: 0,
    toggleSubCategoryItem: 0,
  }),
  computed: {
    ...mapActions({
      getCategories: 'getCategories',
    }),
    ...mapGetters({
      categoriesList: 'categoriesList',
    }),
  },
  created() {
    this.getCategories;
  },
  methods: {
    ...mapActions({
      getProductsByCategoryId: 'getProductsByCategoryId'
    }),
    toggleCategory(id) {
      if (this.toggleCategoryItem === id) {
        this.toggleCategoryItem = null;
      } else {
        this.toggleCategoryItem = id;
        this.getProductsByCategoryId(id);
      }
    },
    toggleSubCategory(id) {
      if (this.toggleSubCategoryItem === id) {
        this.toggleSubCategoryItem = null;
      } else {
        this.toggleSubCategoryItem = id;
        this.getProductsByCategoryId(id);
      }
    },
  }
}
</script>