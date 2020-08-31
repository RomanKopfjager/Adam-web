<template>
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
            {{ item.localizations[0].name }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>