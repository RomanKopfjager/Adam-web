<template>
  <div class="skeleton_wrapper">
    <div class="skeleton_container">

    </div>
  </div>
</template>

<script>

</script>

<style type="text/scss">

.skeleton_wrapper {
  position: relative;
  z-index: 1;
  width: 200px;
  height: 300px;
  background-color: grey;
}

.skeleton_container {
  position: absolute;
  z-index: 2;
  left: -50%;
  top: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 00%,
  rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, 0) 100%);
  animation-delay: 4s;
  animation-name: skeleton;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

@keyframes skeleton {
  from {
    left: -50%;
  }
  to {
    left: 100%;
  }
}

</style>