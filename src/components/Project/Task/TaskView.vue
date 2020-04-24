<template>
  <div class="task-view app-content" v-bind:class="styleClass">
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
  components: {
    TaskContent,
  },
  computed: {
    ...mapGetters(['getTaskByTaskId', 'getProject']),
    task: function() {
      return this.getTaskByTaskId(this.$route.params?.taskId);
    },
    styleClass: function() {
      if (this.getProject?.image) {
        return 'background-present';
      }
      return 'background-not-present';
    },
  },
  watch: {
    getProject: function() {
      if (this.getProject?.image) {
        document.getElementsByClassName(
          'task-view'
        )[0].style.background = `url(${this.getProject.image}) no-repeat center center`;
      }
    },
  },
  mounted() {
    if (this.getProject?.image) {
      document.getElementsByClassName(
        'task-view'
      )[0].style.background = `url(${this.getProject.image}) no-repeat center center`;
    }
  },
};
</script>
<style lang="scss" scoped>
.task-view {
  &.background-present {
    background-size: cover !important;
  }
  background-color: var(--color-background-1);
  height: calc(100vh - 60px);
  overflow-y: auto;
  // .task-view-content {
  //   padding: 20px 50px;
  // }
}
</style>
