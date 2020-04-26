<template>
  <div class="topbar">
    <div class="left">
      <menu-icon @click="$emit('sidebarToggled')" />
      <!-- <Logo class="logo-container desktop-only" v-if="!getProfile.sidebar" /> -->
      <ThumbnailSection class="desktop-only" />
      <div class="left-nav-container">
        <div class="title-row-container"><title-row /></div>
        <context-nav />
      </div>
    </div>
    <div class="right">
      <RightNav />
    </div>
  </div>
</template>
<script>
import RightNav from './RightNav/RightNav.vue';
import TitleRow from './TitleRow.vue';
import ContextNav from './ContextNav/ContextNav.vue';
import MenuIcon from './MenuIcon.vue';
import ThumbnailSection from './ThumbnailSection.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Topbar',
  data: function() {
    return {
      janusLogo: require('@/assets/janus_logo.svg'),
    };
  },
  components: {
    RightNav,
    TitleRow,
    MenuIcon,
    ContextNav,
    ThumbnailSection,
  },
  computed: {
    ...mapGetters(['getProfile', 'getProject']),
  },
  methods: {
    ...mapActions(['removeAuth']),
    logout() {
      this.removeAuth(this.$cookies);
    },
  },
};
</script>
<style scoped lang="scss">
.topbar {
  background-color: var(--color-background-3);
  display: flex;
  height: 100%;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .left-nav-container {
      margin-left: 20px;
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    justify-items: flex-end;
  }
  .logo-container {
    margin-left: 20px;
  }
}
</style>
