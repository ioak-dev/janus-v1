<template>
  <div class="sidebar">
    <Header @sidebarToggled="$emit('sidebarToggled')" />
    <CommonNav />
    <ProjectNav />
  </div>
</template>
<script>
import CommonNav from './CommonNav.vue';
import ProjectNav from './ProjectNav.vue';
import Header from './Header.vue';
export default {
  name: 'Sidebar',
  components: {
    CommonNav,
    Header,
    ProjectNav,
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
