<template>
  <div v-bind:class="getProfile.sidebar ? 'small' : 'large'">
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AppRouterView',
  computed: {
    ...mapGetters(['getProfile']),
  },
};
</script>
<style lang="scss" scoped>
.small {
  width: calc(100vw - 250px);
  margin: auto;
}
.large {
  width: 100vw;
}
</style>
