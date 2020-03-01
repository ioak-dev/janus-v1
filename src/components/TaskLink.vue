<template>
  <div class="task-link">
    <div class="title">{{ task.title }}</div>
    <div class="description">{{ task.body }}</div>
  </div>
</template>

<script>
export default {
  name: 'TaskLink',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.task-link {
  padding: 10px;
  margin: 10px;
  border: 1px solid var(--color-primary);
}
</style>
