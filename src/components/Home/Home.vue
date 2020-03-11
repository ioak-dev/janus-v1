<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.svg" />
    <HomeContent msg="Janus, a clutter free agile management tool" />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeContent from './HomeContent.vue';

export default {
  name: 'Home',
  components: {
    HomeContent,
  },
};
</script>
<style lang="scss" scoped>
.home {
  img {
    width: 400px;
  }
}
</style>
