<template>
  <transition name="fade" v-if="status">
    <div class="settings">
      <div class="popup__bg"
           @click="disablePopup"></div>
      <div class="popup__wrapper">
        <div class="popup__container">
          <div class="settings__logo">
            <img :src="logo" alt="Adam | Eva">
          </div>
          <div class="settings__content__title">
            <div class="settings__content__title__item">Project</div>
            <div class="settings__content__title__item">Ambient Manager</div>
            <div class="settings__content__title__item">Solution</div>
          </div>
          <div class="settings__content">
            <div class="settings__content__project">
              <div class="project__item" v-for="(project, index) in projectsList" :key="index">
                <div class="project__item__title">
                  <div class="title__text">{{ project.title }}</div>
                  <button class="project__item__remove"
                          @click="removeProject(project)"></button>
                </div>
                <div class="project__item__content">
                  <div class="project__item__content__row"
                       v-for="(ambient, i) in project.ambient"
                       :key="i">
                    <div class="project__item__content__item">
                      <div class="item__color">
                        <div class="item__color__wrapper"
                             @click="ambient.visible = !ambient.visible"
                             :style="{backgroundColor: ambient.color}"></div>
                      </div>
                      <div class="item__name">
                        <label class="item__name__label">
                          <input class="item__name__input"
                                 type="text"
                                 v-model="ambient.title">
                        </label>
                      </div>
                      <div class="item__remove"
                           @click="removeAmbient(project, ambient)"></div>
                    </div>
                    <div class="item__color__list" v-if="ambient.visible">
                      <div class="item__color__list__item"
                           v-for="(color, i) in ambient.colors"
                           :key="i"
                           @click="selectColor(ambient, color)"
                           :style="{backgroundColor: color}"></div>
                    </div>
                  </div>
                </div>
                <div class="project__buttons">
                  <button class="add_ambient black_btn"
                          @click="addAmbient(project)">Add ambient
                  </button>
                  <button class="add_project black_btn"
                          @click="addProject()">Add project
                  </button>
                  <label class="checkbox">
                    <input class="checkbox__input"
                           type="checkbox"
                           v-model="project.order">
                    <span class="checkbox__text">
                      <span class="checkbox__text__box"></span>
                      <span class="checkbox__text__content">Increment from last</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="settings__tags">
            <div class="settings__tags__type ">
              <div class="type__item black_btn">1</div>
              <div class="type__item black_btn">2</div>
            </div>
            <div class="settings__tags__title">Category Manager</div>
            <div class="settings__tags__list">
              <button class="list_item black_btn">Soprano</button>
              <button class="list_item black_btn">Polyga</button>
              <button class="list_item black_btn">Projects</button>
              <button class="list_item black_btn">All</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SettingsPopup',
  props: {
    logo: String,
    status: Boolean
  },
  data: () => ({
    colors: [
      '#6bd2ff',
      '#99bb71',
      '#ffeedc',
      '#bbffea',
      '#f9cce0',
      '#8e9be1',
      '#8dc993',
      '#e2c2ad',
      '#febff4',
      '#f094c3',
      '#fbfbfb',
      '#f8ff64',
      '#d0d7ea',
      '#77c39d',
      '#ffbd8b',
      '#e1ff01',
      '#ffffcb',
      '#f7eb7d',
      '#f6958c',
      '#00a4bd',
    ],
    projectsList: [
      {
        id: 0,
        title: 'Project 1',
        ambient: [
          {
            color: '#fefefe',
            title: 'Solution',
            visible: false,
            colors: [
              '#6bd2ff',
              '#99bb71',
              '#ffeedc',
              '#bbffea',
              '#f9cce0',
              '#8e9be1',
              '#8dc993',
              '#e2c2ad',
              '#febff4',
              '#f094c3',
              '#fbfbfb',
              '#f8ff64',
              '#d0d7ea',
              '#77c39d',
              '#ffbd8b',
              '#e1ff01',
              '#ffffcb',
              '#f7eb7d',
              '#f6958c',
              '#00a4bd',
            ],
          }
        ]
      }
    ],
  }),

  methods: {
    disablePopup() {
      this.$emit('disablePopupInside', false)
    },
    randomColor() {
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    addProject() {
      let index = this.projectsList.length + 1;
      let newProject = {
        id: index,
        title: 'Project ' + index,
        ambient: [
          {
            color: '#fefefe',
            title: 'Solution',
            visible: false,
            colors: this.colors
          }
        ]
      };
      newProject.title = 'Project ' + (this.projectsList.length + 1);
      this.projectsList.unshift(newProject)
    },
    removeProject(project) {
      let index = this.projectsList.indexOf(project);
      if (this.projectsList.length > 1) {
        this.projectsList.splice(index, 1);
      }
    },
    addAmbient(project) {
      let ambient = {
        color: this.randomColor(),
        title: 'Solution ' + project.ambient.length,
        visible: false,
        colors: this.colors
      };
      project.order ? project.ambient.push(ambient) : project.ambient.unshift(ambient);
    },
    removeAmbient(project, ambient) {
      let ambientIndex = project.ambient.indexOf(ambient);

      if (project.ambient.length > 1) {
        project.ambient.splice(ambientIndex, 1);
      }
    },
    selectColor(ambient, color) {
      ambient.color = color;
      ambient.visible = false;
    }
  },
  mounted() {

  }
}
</script>