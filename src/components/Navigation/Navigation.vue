<template>
  <div class="navigation">
    <router-link class="test" v-bind:to="`/${getProfile.space}/home`">
      Home
    </router-link>
    <router-link
      v-if="getProfile.auth.isAuth"
      v-bind:to="`/${getProfile.space}/board`"
    >
      Board
    </router-link>
    <router-link
      v-if="getProfile.auth.isAuth"
      v-bind:to="`/${getProfile.space}/list`"
    >
      List View
    </router-link>
    <router-link to="/createspace">
      Create Space
    </router-link>
    <router-link
      v-if="!getProfile.auth.isAuth"
      v-bind:to="`/${getProfile.space}/login?signin=y`"
    >
      Login
    </router-link>
    <router-link
      v-if="!getProfile.auth.isAuth"
      v-bind:to="`/${getProfile.space}/login?signup=y`"
    >
      Sign up
    </router-link>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Navigation',
  computed: {
    ...mapGetters(['getProfile']),
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
.navigation {
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
    color: white;
    padding: 0 10px 0 15px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    &:hover {
      background-color: var(--color-body-dim);
      width: 100%;
    }
    &.router-link-active {
      background-color: var(--color-primary);
      width: 100%;
    }
  }
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-body-dim);
}
</style>
