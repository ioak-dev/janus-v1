<template>
  <div class="task-status" v-if="show">
    <div class="icon complete" v-if="status === 'complete'">
      <OakIcon mat="check_circle" color="success" />
    </div>
    <div class="icon archived" v-if="status === 'archived'">
      <OakIcon mat="archived" color="var(--color-background-5)" />
    </div>
  </div>
</template>
<script>
import OakIcon from '@/oakui/OakIcon.vue';
export default {
  name: 'TaskStatusBadge',
  components: { OakIcon },
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
  .icon {
    display: flex;
    align-items: center;
  }
}
</style>
