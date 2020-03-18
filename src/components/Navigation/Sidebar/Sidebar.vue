<template>
  <div class="sidebar">
    <Header @sidebarToggled="$emit('sidebarToggled')" />
    <CommonNav />
    <ProjectNav />
    <TeamNav />
  </div>
</template>
<script>
import CommonNav from './CommonNav.vue';
import ProjectNav from './ProjectNav.vue';
import TeamNav from './TeamNav.vue';
import Header from './Header.vue';
export default {
  name: 'Sidebar',
  components: {
    CommonNav,
    Header,
    ProjectNav,
    TeamNav,
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
