<template>
  <div class="sidebar">
    <Header @sidebarToggled="$emit('sidebarToggled')" />
    <CommonNav />
    <ProjectNav />
    <TeamNav />
    <ThemeNav />
  </div>
</template>
<script>
import CommonNav from './CommonNav.vue';
import ProjectNav from './ProjectNav.vue';
import TeamNav from './TeamNav.vue';
import ThemeNav from './ThemeNav.vue';
import Header from './Header.vue';
export default {
  name: 'Sidebar',
  components: {
    CommonNav,
    Header,
    ProjectNav,
    TeamNav,
    ThemeNav,
  },
};
</script>
<style scoped lang="scss">
.sidebar {
  display: grid;
  grid-template-rows: repeat(4, auto) 1fr;
  height: 100vh;
  align-content: flex-start;
  align-items: flex-end;
  row-gap: 10px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
