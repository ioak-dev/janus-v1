<template>
  <div class="home">
    <HomeContent />
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
  height: calc(100vh - 60px);
  overflow: auto;
}
</style>
