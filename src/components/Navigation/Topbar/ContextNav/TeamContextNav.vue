<template>
  <div class="nav-menu">
    <router-link
      class="nav-item"
      v-bind:key="`${getTeam._id}_members`"
      v-bind:to="`/${getProfile.space}/${getTeam._id}/team/members`"
    >
      Members
    </router-link>
    <router-link
      class="nav-item"
      v-bind:key="`${getTeam._id}_projects`"
      v-bind:to="`/${getProfile.space}/${getTeam._id}/team/projects`"
    >
      Projects
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TeamContextNav',
  computed: {
    ...mapGetters(['getProfile', 'getTeam']),
  },
};
</script>
<style lang="scss" scoped>
@import './ContextNav.scss';
</style>
