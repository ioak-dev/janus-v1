<template>
  <div class="sidebar">
    <Header
      v-bind:isSidebarExpanded="isSidebarExpanded"
      v-on:sidebarToggled="$emit('sidebarToggled')"
    />
    <Navigation />
  </div>
</template>
<script>
import Navigation from '@/components/Navigation/Navigation.vue';
import Header from './Header.vue';
export default {
  name: 'Sidebar',
  props: {
    isSidebarExpanded: Boolean,
  },
  components: {
    Navigation,
    Header,
  },
};
</script>
<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
