<template>
  <div class="task-child-count" v-if="getSubtasksByTaskId(taskId).length > 0">
    <div class="icon"><i class="material-icons">call_merge</i></div>
    <div class="count">
      {{ getSubtasksByTaskId(taskId).length }}
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TaskChildCountBadge',
  props: { taskId: String },
  computed: { ...mapGetters(['getSubtasksByTaskId']) },
};
</script>
<style lang="scss" scoped>
.task-child-count {
  display: flex;
  align-items: center;
  align-content: center;
  .material-icons {
    display: flex;
    align-items: center;
  }
  color: var(--color-secondary-1);
}
</style>
