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
    <div class="maincontent-container">
      <div
        class="topbar-container"
        v-bind:class="getProfile.sidebar ? 'sidebar-shown' : 'sidebar-hidden'"
      >
        <Topbar @sidebarToggled="toggleSidebar" />
      </div>
      <div
        class="maincontent-container"
        v-bind:class="getProfile.sidebar ? 'sidebar-shown' : 'sidebar-hidden'"
      >
        <AppRouterView />
      </div>
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
  display: flex;
  flex: 1 1;
  // grid-template-columns: 250px 1fr;
  // position: fixed;
  display: grid;
  grid-template-columns: auto 1fr;

  right: 0;
  .sidebar-container {
    overflow: hidden;
    grid-row: 1/3;
    background-color: var(--color-nav);
    color: var(--color-foreground-1);
    width: 250px;
    // transition: margin 250ms ease-in-out;
    transition: margin-left 250ms ease-out, transform 250ms ease-out;
    // width: 100%;
    &.hide {
      // width: 100vw;
      margin-left: -250px;
    }
    &.show {
      @media (min-width: 768px) {
        // width: calc(100vw - 250px);
        margin-left: 0px;
      }
    }
  }

  .topbar-container {
    height: 60px;
    border-bottom: 1px solid var(--color-background-3);
  }

  .maincontent-container {
    // overflow-x: auto;
    // overflow-y: scroll;
    overflow: hidden;
    height: calc(100vh);
    display: flex;
    flex-direction: column;
    grid-template-rows: auto auto;
  }

  .topbar-container,
  .maincontent-container {
    // transition: width 250ms ease-in-out;
    transition: margin 250ms ease-in-out;
    width: 100%;
    &.sidebar-hidden {
      // width: 100vw;
      // margin-left: -250px;
    }
    &.sidebar-shown {
      @media (min-width: 768px) {
        // width: calc(100vw - 250px);
        // margin-left: 0px;
      }
    }
  }
}
</style>
