<template>
  <div class="list-item" draggable="true" @dragover.stop @dragstart="dragStart">
    <div>{{ task.title }}</div>
    <div>{{ task.title }}</div>
    <div>{{ task.title }}</div>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    task: {
      type: Object,
      required: true,
    },
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
  border-bottom: 1px solid var(--color-body-dim);
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  overflow: hidden;
}
</style>
