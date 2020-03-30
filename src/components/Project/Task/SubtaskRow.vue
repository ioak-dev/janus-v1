<template>
  <div class="subtask-row">
    <div>{{ subtask.taskId }}</div>
    <div>{{ subtask.type }}</div>
    <div>{{ subtask.title }}</div>
    <div>{{ subtask.description }}</div>
    <div><Avatar v-bind:user="user" showName /></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Avatar from '@/components/Avatar/Avatar.vue';
export default {
  name: 'SubtaskRow',
  props: {
    subtask: Object,
  },
  components: { Avatar },
  computed: {
    ...mapGetters(['getUserById']),
    user: function() {
      return this.getUserById(this.subtask.createdBy);
    },
  },
};
</script>
<style lang="scss" scoped>
.subtask-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25px, 1fr));
  padding: 10px;
  border-bottom: 1px solid var(--color-background-2);
}
</style>
