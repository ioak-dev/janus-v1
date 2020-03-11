<template>
  <div class="sidebar">
    <Header @sidebarToggled="$emit('sidebarToggled')" />
    <CommonNav />
    <project-nav />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters(['getProfile']),
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
