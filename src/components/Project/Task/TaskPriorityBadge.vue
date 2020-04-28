<template>
  <div class="task-priority" v-if="show">
    <div class="low" v-if="priority === 'Low'">
      <i class="material-icons">arrow_downward</i>
    </div>
    <div class="medium" v-if="priority === 'Medium'">
      <i class="material-icons">import_export</i>
    </div>
    <div class="high" v-if="priority === 'High'">
      <i class="material-icons">arrow_upward</i>
    </div>
    <div class="critical" v-if="priority === 'Critical'">
      <i class="material-icons">arrow_upward</i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TaskPriorityBadge',
  props: { priority: String },
  computed: {
    show: function() {
      return (
        this.priority === 'Low' ||
        this.priority === 'Medium' ||
        this.priority === 'High' ||
        this.priority === 'Critical'
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.task-priority {
  display: flex;
  align-items: center;
  align-content: center;
  .material-icons {
    display: flex;
    align-items: center;
  }
  .low {
    color: var(--color-success);
  }
  .medium {
    // color: var(--color-warning);
  }
  .high {
    color: var(--color-failure);
  }
  .critical {
    color: red;
  }
}
</style>
