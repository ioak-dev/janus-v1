<template>
  <div class="task-view app-content">
    <div class="task-view-content">
      <TaskContent
        v-bind:task="task"
        v-bind:comments="getCommentsForTask"
        v-bind:logs="logs"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { sendMessage } from '@/events/MessageService';
import TaskContent from './TaskContent.vue';
export default {
  name: 'TaskView',
  components: {
    TaskContent,
  },
  computed: {
    ...mapGetters(['getTaskByTaskId', 'getCommentsForTask', 'getLogs']),
    task: function() {
      return this.getTaskByTaskId(this.$route.params?.taskId);
    },
    logs: function() {
      return this.getLogs('Task');
    },
  },
  methods: {
    ...mapActions([
      'fetchTaskComments',
      'fetchLogs',
      'fetchTaskChecklistitems',
    ]),
  },
  watch: {
    task: function() {
      if (this.task) {
        this.fetchTaskComments(this.task._id);
        this.fetchTaskChecklistitems(this.task._id);
        this.fetchLogs({ domain: 'Task', reference: this.task._id });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.task-view {
  background-color: var(--color-background-1);
  height: calc(100vh - 60px);
  overflow-y: auto;
  // .task-view-content {
  //   padding: 20px 50px;
  // }
}
</style>
