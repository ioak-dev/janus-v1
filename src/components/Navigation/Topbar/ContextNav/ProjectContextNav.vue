<template>
  <div class="nav-menu">
    <router-link
      class="nav-item"
      v-bind:key="`${getProject._id}_main`"
      v-bind:to="`/${getProfile.space}/${getProject._id}/main?view=board`"
      v-bind:class="
        $route.path.startsWith(`/${getProfile.space}/${getProject._id}/main`)
          ? 'main-route-active'
          : ''
      "
    >
      Task
    </router-link>
    <router-link
      class="nav-item"
      v-bind:key="`${getProject._id}_team`"
      v-bind:to="`/${getProfile.space}/${getProject._id}/team`"
    >
      Team
    </router-link>
    <router-link
      class="nav-item"
      v-bind:key="`${getProject._id}_changebackground`"
      v-bind:to="`/${getProfile.space}/${getProject._id}/changebackground`"
    >
      Change Background
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { receiveMessage } from '@/events/MessageService';
export default {
  name: 'ProjectContextNav',
  computed: {
    ...mapGetters(['getProfile', 'getProject', 'getTaskToView']),
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
