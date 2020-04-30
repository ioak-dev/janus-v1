<template>
  <div class="task-type" v-if="show">
    <div class="story icon" v-if="type === 'Story'">
      <OakIcon mat="menu_book" theme="warning" />
    </div>
    <div class="task icon" v-if="type === 'Task'">
      <OakIcon mat="bookmark" theme="primary" />
    </div>
    <div class="sub-task icon" v-if="type === 'Sub-task'">
      <OakIcon mat="book" theme="primary" />
    </div>
    <div class="defect icon" v-if="type === 'Defect'">
      <OakIcon mat="bug_report" theme="failure" />
    </div>
    <div class="epic icon" v-if="type === 'Epic'">
      <OakIcon svg="epic" theme="failure" />
    </div>
  </div>
</template>
<script>
import OakIcon from '@/oakui/OakIcon.vue';
export default {
  name: 'TaskTypeBadge',
  components: { OakIcon },
  props: { type: String },
  computed: {
    show: function() {
      return (
        this.type === 'Story' ||
        this.type === 'Task' ||
        this.type === 'Sub-Task' ||
        this.type === 'Defect' ||
        this.type === 'Epic'
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
  .icon {
    display: flex;
    align-items: center;
  }
}
</style>
