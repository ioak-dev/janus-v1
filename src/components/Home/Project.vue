<template>
  <div class="project">
    <div class="">{{ project.name }}</div>
    <div class="">{{ getTasks.length }} open tasks</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Project',
  props: { project: Object },
  computed: { ...mapGetters(['getTasks']) },
};
</script>
<style lang="scss" scoped>
.project {
  background-color: var(--color-primary-1);
  padding: 20px;
  border-radius: 4px;
  box-shadow: var(--bs-lg);
}
</style>
