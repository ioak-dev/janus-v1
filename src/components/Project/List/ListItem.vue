<template>
  <div class="list-item" draggable="true" @dragover.stop @dragstart="dragStart">
    <div>{{ task.taskId }}</div>
    <div class="task-title">{{ task.title }}</div>
    <div>{{ task.assignedTo }}</div>
    <div>{{ task.priority }}</div>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    task: Object,
  },
  methods: {
    dragStart(e) {
      e.dataTransfer.setData('id', this.task.id);
      setTimeout(() => {
        e.target.style.display = 'none';
      }, 0);
    },
  },
};
</script>

<style scoped lang="scss">
.list-item {
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid var(--color-background-2);
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  overflow: hidden;
}
</style>
