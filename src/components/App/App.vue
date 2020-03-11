<template>
  <div id="app" class="theme_dark themecolor_1">
    <AuthInit />
    <Notification />
    <!-- <Navigation /> -->
    <Container />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Notification from '@/components/Notification/Notification.vue';
import AuthInit from '@/components/Auth/AuthInit.vue';
import Container from './Container.vue';
// import Navigation from '@/components/Navigation/Navigation.vue';
export default {
  name: 'App',
  components: {
    Notification,
    AuthInit,
    // Navigation,
    Container,
  },
  computed: {
    ...mapGetters(['getProfile']),
  },
};
</script>

<style lang="scss">
@import './theme.scss';
@import './metric.scss';
body {
  // margin: 0;
}
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  color: var(--color-body-invert);
  background-color: var(--color-background);
}
body {
  width: 100%;
  margin: auto;
  .app-content {
    background-color: var(--color-body);
    color: var(--color-body-invert);
  }
  .boxed {
    min-height: 100vh;
    padding-top: calc(var(--height-nav) + 20px);
    // padding-bottom: 40px;

    @media (min-width: 768px) {
      width: 60%;
      // margin: auto;
    }
    @media (max-width: 767px) {
      // padding-top: 0px;
      // padding-left: 20px;
      // padding-right: 20px;
      width: 90%;
      margin: auto;
    }
  }
  .full {
    min-height: 100vh;
    padding-top: calc(var(--height-nav));
  }
}

::-webkit-scrollbar {
  width: 6px; /* for vertical scrollbars */
  height: 6px; /* for horizontal scrollbars */
}

::-webkit-scrollbar-track {
  // background: var(--color-body-invert-dim);
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: var(--color-body-invert-dim);
  border-radius: 6px;
}
</style>
