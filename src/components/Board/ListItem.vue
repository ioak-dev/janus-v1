<template>
  <div
    class="list-item"
    draggable="true"
    @dragover.prevent
    @dragstart="dragStart"
  >
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
      e.dataTransfer.setData('title', this.task.title);
    },
  },
};
</script>

<style scoped lang="scss">
.list-item {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid var(--color-body-invert-dim);
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  overflow: hidden;
}
</style>
