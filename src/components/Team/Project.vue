<template>
  <div class="project">
    <div class="typography-4">Project Name</div>
    <div>{{ project.name }}</div>
    <div class="typography-4">Agile methodology</div>
    <div>{{ project.type }}</div>
    <div class="typography-4">Estimation Metric</div>
    <div>{{ project.estimationMetric }}</div>
  </div>
</template>
<script>
export default {
  name: 'Project',
  props: { project: Object },
};
</script>
<style lang="scss" scoped>
.project {
  background-color: var(--color-background-2);
  border-radius: 4px;
  padding: 20px;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 4px;
  row-gap: 10px;
  justify-content: center;
  align-items: center;
}
</style>
