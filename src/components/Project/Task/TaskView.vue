<template>
  <div class="task-view" v-bind:key="taskId">
    <div class="task-view-content">
      <TaskContent v-bind:task="task" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { sendMessage } from '@/events/MessageService';
import TaskContent from './TaskContent.vue';
export default {
  name: 'TaskView',
  props: {
    taskId: String,
  },
  components: {
    TaskContent,
  },
  computed: {
    ...mapGetters(['getTaskByTaskId', 'getProject']),
    task: function() {
      return this.getTaskByTaskId(this.taskId);
    },
  },
};
</script>
<style lang="scss" scoped>
.task-view {
  // background-color: var(--color-background-1);
  // height: calc(100vh - 60px);
  // overflow-y: auto;
  // .task-view-content {
  //   padding: 20px 50px;
  // }
}
</style>
