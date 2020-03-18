<template>
  <div class="context-nav">
    <ProjectContextNav v-if="contextName === 'Project' && getProject" />
    <TeamContextNav v-if="contextName === 'Team' && getTeam" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import ProjectContextNav from './ProjectContextNav.vue';
import TeamContextNav from './TeamContextNav.vue';
export default {
  name: 'NavMenu',
  components: {
    ProjectContextNav,
    TeamContextNav,
  },
  computed: {
    ...mapGetters(['getProfile', 'getProject', 'getTeam']),
    contextName: function() {
      return this.$route.meta?.context;
    },
  },
};
</script>
