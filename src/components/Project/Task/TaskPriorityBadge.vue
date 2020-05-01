<template>
  <div class="task-priority" v-if="show">
    <div class="icon low" v-if="priority === 'Low'">
      <OakIcon mat="arrow_downward" color="success" />
    </div>
    <div class="icon medium" v-if="priority === 'Medium'">
      <OakIcon mat="import_export" />
    </div>
    <div class="icon high" v-if="priority === 'High'">
      <OakIcon mat="arrow_upward" color="failure" />
    </div>
    <div class="icon critical" v-if="priority === 'Critical'">
      <OakIcon mat="arrow_upward" color="red" />
    </div>
  </div>
</template>
<script>
import OakIcon from '@/oakui/OakIcon.vue';
export default {
  name: 'TaskPriorityBadge',
  components: { OakIcon },
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
  .icon {
    display: flex;
    align-items: center;
  }
}
</style>
