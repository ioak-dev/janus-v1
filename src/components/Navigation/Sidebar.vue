<template>
  <div class="sidebar">
    <div class="expand-collapse">
      <i
        class="material-icons"
        v-if="isSidebarExpanded"
        v-on:click="$emit('sidebarToggled')"
      >
        menu_open
      </i>
    </div>
    <Navigation />
  </div>
</template>
<script>
import Navigation from '@/components/Navigation/Navigation.vue';
export default {
  name: 'Sidebar',
  props: {
    isSidebarExpanded: Boolean,
  },
  components: {
    Navigation,
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
  .expand-collapse {
    display: flex;
    justify-content: flex-end;
    height: 50px;
    line-height: 50px;
    margin-right: 10px;
    .material-icons {
      cursor: pointer;
      line-height: 50px;
    }
  }
}
</style>
