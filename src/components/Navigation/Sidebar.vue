<template>
  <div class="sidebar">
    <Header @sidebarToggled="$emit('sidebarToggled')" />
    <Navigation />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Navigation from '@/components/Navigation/Navigation.vue';
import Header from './Header.vue';
export default {
  name: 'Sidebar',
  components: {
    Navigation,
    Header,
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
