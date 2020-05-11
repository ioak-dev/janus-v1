<template>
  <div class="navigation">
    <router-link class="test" v-bind:to="`/${getProfile.space}/home`">
      Home
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
    color: #fcfcfc;
    padding: 0 10px 0 15px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    &:hover {
      background-color: var(--color-nav-hover);
    }
    &.router-link-active {
      background-color: var(--color-primary-1);
    }
  }
  padding-bottom: 10px;
}
</style>
