<template>
  <div id="app" class="theme_dark themecolor_2">
    <div class="navigation">
      <div>
        <router-link to="/home">
          Home
        </router-link>
        <router-link to="/board">
          Board
        </router-link>
        <router-link to="/createspace">
          Create Space
        </router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
@import './theme.scss';
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--color-body);
  min-height: 100vh;
  color: var(--color-body-invert);
}
.navigation {
  background-color: var(--color-nav);
  // box-shadow: rgba(31,53,78,.11) 0 1px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  height: var(--height-nav);
  padding: 4px;
  display: flex;
  align-items: center;
}
.navigation a {
  text-decoration: none;
  color: white;
  text-transform: uppercase;
  padding: 8px;
  margin: 10px;
  border-radius: 5px;
}
.navigation a.router-link-active {
  background: var(--color-primary);
  color: var(--color-body);
}
.navigation a:hover {
  background: var(--color-body);
  color: var(--color-body-invert);
}
body {
  width: 100%;
  margin: auto;
  .boxed {
    min-height: 100vh;
    padding-top: calc(var(--height-nav) + 20px);
    // padding-bottom: 40px;

    @media (min-width: 768px) {
      width: 60%;
      margin: auto;
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
</style>
