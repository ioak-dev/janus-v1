<template>
  <div class="task-type" v-if="show">
    <div class="story icon" v-if="type === 'Story'">
      <OakIcon mat="menu_book" :color="color ? color : 'warning'" />
    </div>
    <div class="task icon" v-if="type === 'Task'">
      <OakIcon mat="bookmark" :color="color ? color : 'primary'" />
    </div>
    <div class="sub-task icon" v-if="type === 'Sub-task'">
      <OakIcon mat="book" :color="color ? color : 'primary'" />
    </div>
    <div class="defect icon" v-if="type === 'Defect'">
      <OakIcon mat="bug_report" :color="color ? color : 'failure'" />
    </div>
    <div class="epic icon" v-if="type === 'Epic'">
      <OakIcon svg="epic" :color="color ? color : 'failure'" />
    </div>
  </div>
</template>
<script>
import OakIcon from '@/oakui/OakIcon.vue';
export default {
  name: 'TaskTypeBadge',
  components: { OakIcon },
  props: { type: String, color: String },
  computed: {
    show: function() {
      return (
        this.type === 'Story' ||
        this.type === 'Task' ||
        this.type === 'Sub-task' ||
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
