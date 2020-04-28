<template>
  <div class="task-status" v-if="show">
    <div class="complete" v-if="status === 'complete'">
      <i class="material-icons">check_circle</i>
    </div>
    <div class="archived" v-if="status === 'archived'">
      <i class="material-icons">archived</i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TaskStatusBadge',
  props: { status: String },
  computed: {
    show: function() {
      return this.status === 'complete' || this.status === 'archived';
    },
  },
};
</script>
<style lang="scss" scoped>
.task-status {
  display: flex;
  align-items: center;
  align-content: center;
  .material-icons {
    display: flex;
    align-items: center;
  }
  .complete {
    color: var(--color-success);
  }
  .archived {
    color: var(--color-background-5);
  }
}
</style>
