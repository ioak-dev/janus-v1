<template>
  <div class="landing">
    <LandingContent />
  </div>
</template>

<script>
// @ is an alias to /src
import LandingContent from './LandingContent.vue';

export default {
  name: 'Landing',
  components: {
    LandingContent,
  },
};
</script>
<style lang="scss" scoped>
.home {
}
</style>
