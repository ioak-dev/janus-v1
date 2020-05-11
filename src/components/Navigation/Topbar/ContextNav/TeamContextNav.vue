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
    <router-link
      class="nav-item"
      v-bind:key="`${getTeam._id}_administrators`"
      v-bind:to="`/${getProfile.space}/${getTeam._id}/team/administrators`"
      v-if="isTeamAdministrator"
    >
      Administrators
    </router-link>
    <router-link
      class="nav-item"
      v-bind:key="`${getTeam._id}_changebackground`"
      v-bind:to="`/${getProfile.space}/${getTeam._id}/team/changebackground`"
      v-if="isTeamAdministrator"
    >
      Change Background
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TeamContextNav',
  computed: {
    ...mapGetters(['getProfile', 'getTeam', 'getRolesByTeamId']),
    isTeamAdministrator: function() {
      return this.getRolesByTeamId(this.getTeam._id).find(
        item => item.userId === this.getProfile.auth._id
      );
    },
  },
};
</script>
<style lang="scss" scoped>
@import './ContextNav.scss';
</style>
