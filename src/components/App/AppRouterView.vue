<template>
  <div v-bind:class="isSidebarExpanded ? 'small' : 'large'">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'AppRouterView',
  props: {
    isSidebarExpanded: Boolean,
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
