<template>
  <div class="context-nav">
    <ProjectContextNav v-if="contextName === 'Project' && getProject" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import ProjectContextNav from './ProjectContextNav.vue';
export default {
  name: 'NavMenu',
  components: {
    ProjectContextNav,
  },
  computed: {
    ...mapGetters(['getProfile', 'getProject']),
    contextName: function() {
      return this.$route.meta?.context;
    },
  },
};
</script>
