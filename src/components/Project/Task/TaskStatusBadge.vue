<template>
  <div class="task-status" v-if="show">
    <div class="icon open" v-if="status === 'open'">
      <OakIcon mat="calendar_today" />
    </div>
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
  props: { status: String, showOpen: Boolean },
  computed: {
    show: function() {
      if (this.showOpen) {
        return ['open', 'complete', 'archived'].includes(this.status);
      } else {
        return ['complete', 'archived'].includes(this.status);
      }
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
