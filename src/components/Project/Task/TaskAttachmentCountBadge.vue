<template>
  <div class="task-child-count" v-if="getSubtasksByTaskId(taskId).length > 0">
    <div class="icon">
      <OakIcon mat="call_merge" color="var(--color-secondary-1)" />
    </div>
    <div class="count">
      {{ getSubtasksByTaskId(taskId).length }}
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import OakIcon from '@/oakui/OakIcon.vue';
export default {
  name: 'TaskAttachmentCountBadge',
  components: { OakIcon },
  props: { taskId: String },
  computed: { ...mapGetters(['getSubtasksByTaskId']) },
};
</script>
<style lang="scss" scoped>
.task-child-count {
  display: flex;
  align-items: center;
  align-content: center;
  .icon {
    display: flex;
    align-items: center;
  }
  color: var(--color-secondary-1);
}
</style>
