<template>
  <div class="landing-content">
    <div class="landing-content--logo"><Logo /></div>
    <div class="landing-content--container">
      <div class="landing-content--container--left">
        <ListSpaces />
      </div>
      <hr />
      <div class="landing-content--container--right">
        <GettingStarted />
      </div>
    </div>
  </div>
</template>
<script>
import GettingStarted from './GettingStarted.vue';
import ListSpaces from './ListSpaces.vue';
import Logo from '../Logo/Logo.vue';
export default {
  name: 'LandingContent',
  components: { GettingStarted, ListSpaces, Logo },
};
</script>
<style lang="scss" scoped>
.landing-content {
  height: 100vh;
  background-color: var(--color-background-2);
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: center;
  align-content: center;
  .landing-content--logo {
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }

  .landing-content--container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    align-content: center;
    .landing-content--container--left,
    .landing-content--container--right {
      max-height: 100vh;
      display: grid;
      grid-auto-flow: row;
      // align-content: center;
      padding: 0 20px;
      overflow: auto;
    }

    hr {
      height: 80%;
      border: 1px solid var(--color-background-5);
      margin: auto;
    }
  }
}
</style>
