<template>
  <div class="app-container">
    <div
      class="sidebar-container"
      v-bind:class="getProfile.sidebar ? 'show' : 'hide'"
    >
      <div class="sidebar-content">
        <Sidebar @sidebarToggled="toggleSidebar" />
      </div>
    </div>
    <div class="topbar-container">
      <Topbar @sidebarToggled="toggleSidebar" />
    </div>
    <div
      class="maincontent-container"
      v-bind:class="getProfile.sidebar ? 'sidebar-shown' : 'sidebar-hidden'"
    >
      <AppRouterView />
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/Navigation/Sidebar/Sidebar.vue';
import Topbar from '@/components/Navigation/Topbar/Topbar.vue';
import AppRouterView from '@/components/App/AppRouterView.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Content',
  components: {
    Sidebar,
    Topbar,
    AppRouterView,
  },
  computed: {
    ...mapGetters(['getProfile']),
  },
  methods: {
    ...mapActions(['toggleSidebar']),
  },
};
</script>
<style scoped lang="scss">
.app-container {
  display: grid;
  grid-template-columns: auto 1fr;
  position: fixed;

  right: 0;
  .sidebar-container {
    overflow: hidden;
    grid-row: 1/3;
    background-color: var(--color-nav);
    color: var(--color-body-invert);
    width: 250px;
  }

  .topbar-container {
    height: 60px;
    border-bottom: 1px solid var(--color-body-dim);
  }

  .maincontent-container {
    // overflow-x: auto;
    // overflow-y: scroll;
    overflow: hidden;
    height: calc(100vh - 60px);
    display: grid;
    grid-template-rows: auto auto;
    transition: width 250ms ease-in-out;
    &.sidebar-hidden {
      width: 100vw;
    }
    &.sidebar-shown {
      width: calc(100vw - 250px);
    }
  }
}
</style>
