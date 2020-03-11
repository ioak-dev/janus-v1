<template>
  <div class="nav-menu">
    <router-link
      class="nav-item"
      v-bind:to="`/${getProfile.space}/${getProject._id}/board`"
    >
      Board
    </router-link>
    <router-link
      class="nav-item"
      v-bind:to="`/${getProfile.space}/${getProject._id}/list`"
    >
      List
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ProjectContextNav',
  computed: {
    ...mapGetters(['getProfile', 'getProject']),
  },
};
</script>
<style lang="scss" scoped>
@import './ContextNav.scss';
</style>
