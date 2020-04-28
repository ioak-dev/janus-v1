<template>
  <div class="task-type" v-if="show">
    <div class="story" v-if="type === 'Story'">
      <i class="material-icons">menu_book</i>
    </div>
    <div class="task" v-if="type === 'Task'">
      <i class="material-icons">bookmark</i>
    </div>
    <div class="sub-task" v-if="type === 'Sub-task'">
      <i class="material-icons">book</i>
    </div>
    <div class="defect" v-if="type === 'Defect'">
      <i class="material-icons">bug_report</i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TaskTypeBadge',
  props: { type: String },
  computed: {
    show: function() {
      return (
        this.type === 'Story' ||
        this.type === 'Task' ||
        this.type === 'Sub-Task' ||
        this.type === 'Defect'
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.task-type {
  display: flex;
  align-items: center;
  align-content: center;
  .material-icons {
    display: flex;
    align-items: center;
  }
  .story {
    color: var(--color-warning);
  }
  .defect {
    color: var(--color-failure);
  }
  .task,
  .sub-task {
    color: var(--color-primary-1);
  }
}
</style>
