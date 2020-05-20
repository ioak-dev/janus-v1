<template>
  <div class="nav-menu" v-if="isProjectAdministrator">
    <router-link
      class="nav-item"
      v-bind:key="`${getProject._id}_dashboard`"
      v-bind:to="`/${getProfile.space}/${getProject._id}/dashboard?view=board`"
      v-bind:class="
        $route.path.startsWith(
          `/${getProfile.space}/${getProject._id}/dashboard`
        )
          ? 'main-route-active'
          : ''
      "
    >
      Dashboard
    </router-link>
    <router-link
      class="nav-item desktop-only"
      v-if="isProjectAdministrator"
      v-bind:key="`${getProject._id}_administration`"
      v-bind:to="
        `/${getProfile.space}/${getProject._id}/administration?view=team`
      "
      v-bind:class="
        $route.path.startsWith(
          `/${getProfile.space}/${getProject._id}/administration`
        )
          ? 'main-route-active'
          : ''
      "
    >
      Administration
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { receiveMessage } from '@/events/MessageService';
export default {
  name: 'ProjectContextNav',
  computed: {
    ...mapGetters([
      'getProfile',
      'getProject',
      'getTaskToView',
      'getRolesByProjectId',
    ]),
    isProjectAdministrator: function() {
      return this.getRolesByProjectId(this.getProject._id).find(
        item => item.userId === this.getProfile.auth._id
      );
    },
  },
  mounted() {
    this.eventBus = receiveMessage().subscribe(message => {
      if (message.name === 'task-view-updated') {
        this.taskId = message.data;
      }
    });
  },
};
</script>
<style lang="scss" scoped>
@import './ContextNav.scss';
</style>
