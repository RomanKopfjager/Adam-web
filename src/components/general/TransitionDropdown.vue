<template>
  <transition
          name="dropdown"
          @enter="enter"
          @after-enter="afterEnter"
          @leave="leave"
  >
    <slot/>
  </transition>
</template>

<script>
  export default {
    name: 'TransitionDropdown',
    methods: {
      enter(element) {
        const width = getComputedStyle(element).width;
        element.style.width = width;
        element.style.position = 'absolute';
        element.style.visibility = 'hidden';
        element.style.height = 'auto';

        const height = getComputedStyle(element).height;

        element.style.width = null;
        element.style.position = null;
        element.style.visibility = null;
        element.style.height = 0;

        // Force repaint to make sure the
        // animation is triggered correctly.
        getComputedStyle(element).height;

        // Trigger the animation.
        // We use `requestAnimationFrame` because we need
        // to make sure the browser has finished
        // painting after setting the `height`
        // to `0` in the line above.
        requestAnimationFrame(() => {
          element.style.height = height;
        });
      },
      afterEnter(element) {
        element.style.height = 'auto';
      },
      leave(element) {
        const height = getComputedStyle(element).height;

        element.style.height = height;

        // Force repaint to make sure the
        // animation is triggered correctly.
        getComputedStyle(element).height;

        requestAnimationFrame(() => {
          element.style.height = 0;
        });
      },
    },
  };
</script>

<style>
  .dropdown-enter-active,
  .dropdown-leave-active {
    overflow: hidden;
    transition: height .4s ease-in-out;
    transition-property: opacity, height;
  }

  .dropdown-enter,
  .dropdown-leave-to {
    height: 0;
    opacity: 0;
  }
</style>