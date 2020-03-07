<template>
  <div
    class="card app-content"
    draggable="true"
    @dragover.prevent
    @dragstart="dragStart"
  >
    <div class="title">{{ task.title }}</div>
    <!-- <div class="description">{{ task.body }}</div> -->
  </div>
</template>

<script>
export default {
  name: 'Card',
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
.card {
  cursor: pointer;
  user-select: none;
  padding: 10px;
  margin: 0px 8px 8px 0px;
  box-shadow: 0 1px 3px 0 var(--color-body);
  border-radius: 4px;
  // margin-bottom: 10px;
  // border: 1px solid var(--color-primary);
}
</style>
