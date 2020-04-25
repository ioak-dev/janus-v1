<template>
  <div class="nav-menu">
    <router-link
      class="nav-item"
      v-bind:key="`${getProject._id}_board`"
      v-bind:to="`/${getProfile.space}/${getProject._id}/board`"
    >
      Board
    </router-link>
    <router-link
      class="nav-item"
      v-bind:key="`${getProject._id}_list`"
      v-bind:to="`/${getProfile.space}/${getProject._id}/list`"
    >
      List
    </router-link>
    <router-link
      class="nav-item"
      v-bind:key="`${getProject._id}_planning`"
      v-bind:to="`/${getProfile.space}/${getProject._id}/planning`"
    >
      Planning
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
    <div class="task-link" v-for="taskId in getTaskToView" v-bind:key="taskId">
      <router-link
        class="nav-item"
        v-bind:key="`${getProject._id}_task`"
        v-bind:to="`/${getProfile.space}/${getProject._id}/task/${taskId}`"
      >
        {{ taskId }}
      </router-link>
    </div>
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
.task-link {
  display: inherit;
  white-space: nowrap;
}
</style>
