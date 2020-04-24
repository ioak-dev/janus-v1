<template>
  <div id="app" class="theme_dark themecolor_1">
    <!-- <AuthInit /> -->
    <Backdrop />
    <Notification />
    <!-- <Navigation /> -->
    <Container />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Notification from '@/components/Notification/Notification.vue';
// import AuthInit from '@/components/Auth/AuthInit.vue';
import Container from './Container.vue';
import Backdrop from './Backdrop.vue';
// import Navigation from '@/components/Navigation/Navigation.vue';
export default {
  name: 'App',
  components: {
    Notification,
    // AuthInit,
    // Navigation,
    Container,
    Backdrop,
  },
  computed: {
    ...mapGetters(['getProfile']),
  },
};
</script>

<style lang="scss">
@import './theme.scss';
@import './metric.scss';
body,
p {
  margin: 0;
}
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  color: var(--color-foreground-1);
  background-color: var(--color-background-1);
}
body {
  width: 100%;
  margin: auto;
  .form-element-label {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    display: block;
    // bottom: 8px;
    // left: 10px;
    position: relative;
    font-size: var(--metric-typography-4);
    color: var(--color-foreground-2);
    text-transform: capitalize;
  }
  .app-content {
    background-color: var(--color-background-1);
    color: var(--color-foreground-1);
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
  // background: var(--color-foreground-2);
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: var(--color-foreground-2);
  border-radius: 6px;
}

.modal-body {
  max-height: 80vh;
  overflow-y: auto;
  padding: 0 20px;
  margin: 10px 0 20px 0;
  display: grid;
}

.modal-footer {
  // border-top: 1px solid var(--color-background-5);
  background-color: var(--color-background-2);
  height: 50px;
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  column-gap: 10px;

  // &::before {
  //     position: fixed;
  //     display: inline-block;
  //     content: "";
  //     border-top: 2px solid var(--color-foreground-2);
  //     width: 90%;
  //     // margin: 0 1rem;
  //     // transform: translateY(-1rem);
  // }
}
</style>
